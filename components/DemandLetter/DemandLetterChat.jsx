'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Scale } from 'lucide-react';
import LetterPreview from './LetterPreview';
import MailingUpsell from './MailingUpsell';

const DISPUTE_TYPES = [
  { id: 'wrongful_termination', label: 'Wrongful Termination', emoji: '🏢' },
  { id: 'unpaid_wages',         label: 'Unpaid Wages',         emoji: '💰' },
  { id: 'landlord_tenant',      label: 'Landlord / Tenant',    emoji: '🏠' },
  { id: 'property_damage',      label: 'Auto / Property Damage', emoji: '🚗' },
  { id: 'consumer',             label: 'Consumer Dispute',     emoji: '🛒' },
  { id: 'contract',             label: 'Breach of Contract',   emoji: '📋' },
  { id: 'medical',              label: 'Medical / Services',   emoji: '⚕️' },
  { id: 'other',                label: 'Other',                emoji: '📄' },
];

const SYSTEM_PROMPT = `You are a professional demand letter intake specialist. Your job is to gather the information needed to write an effective demand letter.

Ask ONE or TWO questions at a time. Be conversational and friendly. When you have collected:
1. The dispute type and what happened
2. The specific amount or remedy being demanded
3. The recipient's name and address (business or individual)
4. The sender's name
5. Any relevant dates or prior communications
6. A reasonable deadline for response

...respond with EXACTLY this token on its own line: READY_TO_GENERATE

Until then, keep asking follow-up questions to gather missing details. Be specific — the more detail you collect, the better the letter.`;

function generateLetterPrompt(disputeType, conversation) {
  const history = conversation
    .filter(m => m.role !== 'system')
    .map(m => `${m.role === 'assistant' ? 'AI' : 'User'}: ${m.content}`)
    .join('\n');

  return `Based on this intake conversation, write a professional demand letter.

Dispute type: ${disputeType}
Intake conversation:
${history}

Write a complete, formal demand letter. Include:
- Sender's address (use [SENDER ADDRESS] if not provided)
- Date
- Recipient's name and address
- Subject line
- Professional opening paragraph stating the dispute
- Clear statement of the specific remedy/amount demanded
- Deadline for response (use the date discussed or 14 days from today)
- Consequence if ignored (small claims court, legal action, etc.)
- Professional closing

Format it as a proper letter. Do not include any commentary — just the letter text.`;
}

export default function DemandLetterChat() {
  const [phase, setPhase] = useState('select'); // select | chat | preview | upsell
  const [disputeType, setDisputeType] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const selectDispute = async (type) => {
    setDisputeType(type.label);
    setPhase('chat');
    const greeting = {
      role: 'assistant',
      content: `I'll help you write a demand letter for your ${type.label} dispute. Let's start by getting the key details.

What happened? Give me a brief overview and I'll ask follow-up questions to fill in what we need.`,
    };
    setMessages([greeting]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = newMessages.map(m => ({ role: m.role, content: m.content }));
      const res = await fetch('/api/demand-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'intake',
          systemPrompt: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });

      const data = await res.json();
      const aiContent = data.content || '';

      if (aiContent.includes('READY_TO_GENERATE')) {
        const visibleContent = aiContent.replace('READY_TO_GENERATE', '').trim() ||
          'I have everything I need. Generating your letter now…';
        setMessages(prev => [...prev, { role: 'assistant', content: visibleContent }]);
        await generateLetter(newMessages);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const generateLetter = async (conversation) => {
    setLoading(true);
    try {
      const res = await fetch('/api/demand-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          prompt: generateLetterPrompt(disputeType, conversation),
        }),
      });
      const data = await res.json();
      const content = data.content || '';

      if (!content.trim()) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Something went wrong generating your letter. Please try again.',
        }]);
        return;
      }

      setLetter(content);

      // Extract recipient address from conversation for mailing
      const allText = conversation.map(m => m.content).join(' ');
      const addrMatch = allText.match(/\d+\s+[\w\s]+(?:Street|St|Avenue|Ave|Road|Rd|Blvd|Drive|Dr|Lane|Ln)[^,\n]*/i);
      if (addrMatch) setRecipientAddress(addrMatch[0]);

      setPhase('preview');
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Failed to generate your letter. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditRequest = async (editRequest) => {
    setLoading(true);
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
      setLetter(data.content || letter);
    } catch {
      // keep existing letter on error
    } finally {
      setLoading(false);
    }
  };

  // ── Select dispute type ──────────────────────────────
  if (phase === 'select') {
    return (
      <div className="min-h-[calc(100vh-130px)] bg-navy-deeper flex flex-col" style={{ background: '#131f3a' }}>
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)' }}>
            <Scale size={22} className="text-navy" />
          </div>
          <h1 className="font-serif text-white text-2xl font-bold mb-2 text-center">
            Write a Demand Letter
          </h1>
          <p className="text-white/50 text-sm mb-10 text-center max-w-sm">
            Select your dispute type to get started. Our AI will ask the right questions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
            {DISPUTE_TYPES.map(type => (
              <button
                key={type.id}
                onClick={() => selectDispute(type)}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all duration-200 text-white"
              >
                <span className="text-2xl">{type.emoji}</span>
                <span className="text-xs font-medium text-center leading-tight">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Preview + upsell ────────────────────────────────
  if (phase === 'preview' || phase === 'upsell') {
    return (
      <div className="min-h-[calc(100vh-130px)] bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {phase === 'preview' && (
            <>
              <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-5">
                <Scale size={13} />
                Your Demand Letter — {disputeType}
              </div>
              <LetterPreview
                letter={letter}
                onApprove={() => setPhase('upsell')}
                onRequestEdit={handleEditRequest}
              />
              {loading && (
                <p className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-3 h-3 rounded-full bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-3 h-3 rounded-full bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                </p>
              )}
            </>
          )}
          {phase === 'upsell' && (
            <>
              <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-5">
                <Scale size={13} />
                Send Your Letter
              </div>
              <MailingUpsell
                letter={letter}
                recipientAddress={recipientAddress}
                senderEmail={senderEmail}
                senderName={senderName}
              />
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Chat interface ──────────────────────────────────
  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 130px)', background: '#131f3a' }}>
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}>
          L
        </div>
        <div>
          <p className="text-white text-sm font-semibold">Legaliant AI</p>
          <p className="text-white/40 text-xs">{disputeType} — Intake</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold self-end"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}>
                L
              </div>
            )}
            <div
              className={[
                'max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'rounded-tr-sm text-white'
                  : 'rounded-tl-sm text-white/90',
              ].join(' ')}
              style={{
                background: msg.role === 'user' ? '#1a2744' : '#1e2f5a',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start gap-2">
            <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}>
              L
            </div>
            <div className="px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: '#1e2f5a' }}>
              <div className="flex gap-1 items-center">
                {[0, 150, 300].map(delay => (
                  <span key={delay} className="w-2 h-2 rounded-full bg-gold animate-bounce"
                    style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            className="flex-1 px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
            style={{
              background: '#1e2f5a',
              border: '1px solid rgba(255,255,255,0.1)',
              minHeight: '44px',
              maxHeight: '120px',
            }}
            placeholder="Type your answer…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
            }}
            rows={1}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-40"
            style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)' }}
          >
            <Send size={16} className="text-navy" />
          </button>
        </div>
        <p className="text-white/20 text-xs text-center mt-2">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
