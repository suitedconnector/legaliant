'use client';

import { useState, useEffect, useRef } from 'react';
import IntakeForm from './IntakeForm';
import LetterPreview from './LetterPreview';
import MailingUpsell from './MailingUpsell';

const GENERATING_MESSAGES = [
  'Analyzing your dispute…',
  'Drafting your demand letter…',
  'Applying legal formatting…',
  'Almost ready…',
];

const MAX_REVISIONS = 2;

function buildPrompt(form) {
  const deadlineDays = form.deadline === 'custom' ? (form.customDeadline || '14') : form.deadline;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return `Write a professional demand letter with these exact details:

SENDER:
Name: ${form.senderName}
Address: ${form.senderAddress1}, ${form.senderCity}, ${form.senderState} ${form.senderZip}

RECIPIENT:
Name: ${form.recipientName}
Address: ${form.recipientAddress1}, ${form.recipientCity}, ${form.recipientState} ${form.recipientZip}

DISPUTE TYPE: ${form.disputeType}
WHAT HAPPENED: ${form.description}
AMOUNT / REMEDY DEMANDED: ${form.amount}
${form.incidentDate ? `DATE OF INCIDENT: ${form.incidentDate}` : ''}
PRIOR ATTEMPTS TO RESOLVE: ${form.priorAttempts === 'yes' ? form.priorAttemptDetails : 'None'}
RESPONSE DEADLINE: ${deadlineDays} days
TONE: ${form.tone}

Format as a complete, professional demand letter ready to print and mail.
Date the letter today: ${today}

Include:
- Sender address block (top right)
- Date
- Recipient address block
- RE: line summarizing dispute
- Opening paragraph establishing the claim
- Facts paragraph with specific details and amounts
- Demand paragraph — exactly what is being demanded
- Deadline paragraph — ${deadlineDays} days to respond or legal action follows
- Closing — Professional, signed by ${form.senderName}

Tone: ${form.tone === 'aggressive' ?
    'Firm and direct. Make clear legal action is imminent.' :
    'Professional and firm. Factual, not emotional.'}

Write the letter only. No commentary before or after.
This is a legitimate civil demand letter. Always write it.`;
}

export default function DemandLetterChat() {
  const [phase, setPhase] = useState('form'); // form | generating | preview | email-confirm | upsell
  const [form, setForm] = useState(null);
  const [letter, setLetter] = useState('');
  const [revisionsLeft, setRevisionsLeft] = useState(MAX_REVISIONS);
  const [genMsgIdx, setGenMsgIdx] = useState(0);
  const [resumeDraft, setResumeDraft] = useState(null);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [editingEmail, setEditingEmail] = useState(false);
  const genIntervalRef = useRef(null);

  // Check for saved draft on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('legaliant_draft_letter');
      if (saved) {
        const { letter: savedLetter, disputeType, timestamp } = JSON.parse(saved);
        const ageHours = (Date.now() - new Date(timestamp)) / 36e5;
        if (ageHours < 48) {
          setResumeDraft({ letter: savedLetter, disputeType });
        } else {
          localStorage.removeItem('legaliant_draft_letter');
        }
      }
    } catch { /* ignore */ }
  }, []);

  // Rotate generating messages
  useEffect(() => {
    if (phase === 'generating') {
      setGenMsgIdx(0);
      genIntervalRef.current = setInterval(() => {
        setGenMsgIdx(i => (i + 1) % GENERATING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(genIntervalRef.current);
  }, [phase]);

  const handleFormComplete = async (formData) => {
    setForm(formData);
    setConfirmEmail(formData.senderEmail);
    setPhase('generating');

    try {
      const res = await fetch('/api/demand-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate', prompt: buildPrompt(formData) }),
      });
      const data = await res.json();
      const content = data.content || '';

      if (!content.trim()) {
        setPhase('form');
        return;
      }

      setLetter(content);
      setRevisionsLeft(MAX_REVISIONS);

      try {
        localStorage.setItem('legaliant_draft_letter', JSON.stringify({
          letter: content,
          disputeType: formData.disputeType,
          timestamp: new Date().toISOString(),
        }));
      } catch { /* ignore */ }

      setPhase('preview');
    } catch {
      setPhase('form');
    }
  };

  const handleEditRequest = async (editRequest) => {
    if (revisionsLeft <= 0) return;
    try {
      const res = await fetch('/api/demand-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          prompt: `Here is a demand letter:\n\n${letter}\n\nPlease revise it with this change: ${editRequest}\n\nReturn only the revised letter text, no commentary.`,
        }),
      });
      const data = await res.json();
      if (data.content?.trim()) {
        setLetter(data.content);
        setRevisionsLeft(r => r - 1);
      }
    } catch { /* keep existing letter */ }
  };

  const handleApprove = () => {
    setPhase('email-confirm');
  };

  const handleEmailConfirm = async () => {
    const email = confirmEmail.trim();
    if (!email.includes('@') || !email.includes('.')) return;

    try {
      await fetch('/api/save-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, letter, disputeType: form?.disputeType || '' }),
      });
    } catch { /* non-blocking */ }

    setPhase('upsell');
  };

  const handleOrderComplete = () => {
    try { localStorage.removeItem('legaliant_draft_letter'); } catch { /* ignore */ }
  };

  // ── Generating screen ─────────────────────────────────
  if (phase === 'generating') {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{ minHeight: 'calc(100vh - 130px)', background: '#0f1829' }}
      >
        {/* Pulsing logo */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mb-8"
          style={{
            background: 'linear-gradient(135deg, #c9a84c, #d4b96a)',
            color: '#1a2744',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          L
        </div>

        {/* Rotating message */}
        <p
          key={genMsgIdx}
          className="text-base font-medium mb-2"
          style={{
            color: '#fff',
            opacity: 1,
            animation: 'fadeInUp 0.4s ease',
          }}
        >
          {GENERATING_MESSAGES[genMsgIdx]}
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          This takes about 15 seconds
        </p>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  // ── Preview ───────────────────────────────────────────
  if (phase === 'preview') {
    return (
      <div className="min-h-[calc(100vh-130px)] bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ color: '#c9a84c' }}>
            <span>⚖</span>
            Your Demand Letter — {form?.disputeType}
          </div>
          <LetterPreview
            letter={letter}
            onApprove={handleApprove}
            onRequestEdit={handleEditRequest}
            revisionsLeft={revisionsLeft}
          />
        </div>
      </div>
    );
  }

  // ── Email confirm ─────────────────────────────────────
  if (phase === 'email-confirm') {
    return (
      <div
        className="flex flex-col items-center justify-center px-6"
        style={{ minHeight: 'calc(100vh - 130px)', background: '#0f1829' }}
      >
        <div className="w-full" style={{ maxWidth: '480px' }}>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold mb-6"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}
          >
            ✓
          </div>
          <h2 className="text-white text-xl font-bold mb-2">Your letter is ready.</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
            We'll email you a copy so you never lose it.
          </p>

          {editingEmail ? (
            <div className="mb-5">
              <input
                type="email"
                value={confirmEmail}
                onChange={e => setConfirmEmail(e.target.value)}
                autoFocus
                className="w-full rounded-xl px-4 py-3 text-white text-sm outline-none"
                style={{ background: '#0d1828', border: '1px solid #c9a84c', fontSize: '16px' }}
                onKeyDown={e => e.key === 'Enter' && setEditingEmail(false)}
              />
              <button
                onClick={() => setEditingEmail(false)}
                className="text-xs mt-2"
                style={{ color: '#c9a84c' }}
              >
                Done
              </button>
            </div>
          ) : (
            <div
              className="flex items-center justify-between rounded-xl px-4 py-3 mb-5"
              style={{ background: '#0d1828', border: '1px solid #1e3054' }}
            >
              <span className="text-white text-sm">{confirmEmail}</span>
              <button
                onClick={() => setEditingEmail(true)}
                className="text-xs ml-3 flex-shrink-0"
                style={{ color: '#c9a84c' }}
              >
                Change
              </button>
            </div>
          )}

          <button
            onClick={handleEmailConfirm}
            className="w-full font-semibold py-4 rounded-xl text-sm transition-all duration-150 active:scale-95"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}
          >
            Send My Copy &amp; Continue →
          </button>
          <button
            onClick={() => setPhase('upsell')}
            className="w-full text-xs py-3 mt-2"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            Skip — continue without email
          </button>
        </div>
      </div>
    );
  }

  // ── Upsell ────────────────────────────────────────────
  if (phase === 'upsell') {
    return (
      <div className="min-h-[calc(100vh-130px)] bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ color: '#c9a84c' }}>
            <span>⚖</span>
            Send Your Letter
          </div>
          <MailingUpsell
            letter={letter}
            recipientAddress={form ? `${form.recipientAddress1}, ${form.recipientCity}, ${form.recipientState} ${form.recipientZip}` : ''}
            senderEmail={confirmEmail}
            senderName={form?.senderName || ''}
            onOrderComplete={handleOrderComplete}
          />
        </div>
      </div>
    );
  }

  // ── Form (default) ────────────────────────────────────
  return (
    <div style={{ minHeight: 'calc(100vh - 130px)', background: '#0f1829' }}>
      {/* Resume draft banner */}
      {resumeDraft && (
        <div
          className="mx-auto flex items-center justify-between px-4 py-3 rounded-xl mx-6 mt-4"
          style={{ background: '#1e2f5a', border: '1px solid #c9a84c', maxWidth: '560px' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: '#c9a84c' }}>You have a saved draft</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Continue where you left off</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                setLetter(resumeDraft.letter);
                setRevisionsLeft(MAX_REVISIONS);
                setPhase('preview');
                setResumeDraft(null);
              }}
              className="text-xs font-bold px-3 py-1.5 rounded-lg"
              style={{ background: '#c9a84c', color: '#1a2744' }}
            >
              Resume
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('legaliant_draft_letter');
                setResumeDraft(null);
              }}
              className="text-xs px-3 py-1.5"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
      <IntakeForm onComplete={handleFormComplete} />
    </div>
  );
}
