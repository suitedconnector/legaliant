'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronLeft } from 'lucide-react';

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

const EMPTY = {
  senderName: '', senderEmail: '', senderAddress1: '', senderCity: '', senderState: '', senderZip: '',
  recipientName: '', recipientAddress1: '', recipientCity: '', recipientState: '', recipientZip: '',
  disputeType: '', description: '', amount: '', incidentDate: '',
  priorAttempts: '', priorAttemptDetails: '',
  deadline: '14', customDeadline: '', tone: 'professional',
};

function buildQuestions(answers) {
  return [
    {
      id: 'senderName',
      question: "What's your full name?",
      sub: "This will appear as the sender on your letter.",
      fields: [{ key: 'senderName', type: 'text', placeholder: 'Jane Smith', required: true }],
    },
    {
      id: 'senderEmail',
      question: "What's your email address?",
      sub: "We'll send you a copy of your letter.",
      fields: [{ key: 'senderEmail', type: 'email', placeholder: 'jane@example.com', required: true }],
    },
    {
      id: 'senderAddress',
      question: "What's your mailing address?",
      sub: "This appears in the sender block of your letter.",
      fields: [
        { key: 'senderAddress1', type: 'text', placeholder: '123 Main Street', label: 'Street Address', required: true },
        { key: 'senderCity',     type: 'text', placeholder: 'Los Angeles',     label: 'City',           required: true, flex: 3 },
        { key: 'senderState',    type: 'text', placeholder: 'CA',              label: 'State',          required: true, flex: 1, maxLength: 2 },
        { key: 'senderZip',      type: 'text', placeholder: '90001',           label: 'ZIP',            required: true, flex: 2, maxLength: 10 },
      ],
    },
    {
      id: 'recipientName',
      question: "Who are you sending this to?",
      sub: "Enter the person or business responsible for your dispute.",
      fields: [{ key: 'recipientName', type: 'text', placeholder: 'ABC Property Management', required: true }],
    },
    {
      id: 'recipientAddress',
      question: "What's their address?",
      fields: [
        { key: 'recipientAddress1', type: 'text', placeholder: '456 Business Ave', label: 'Street Address', required: true },
        { key: 'recipientCity',     type: 'text', placeholder: 'Los Angeles',      label: 'City',           required: true, flex: 3 },
        { key: 'recipientState',    type: 'text', placeholder: 'CA',               label: 'State',          required: true, flex: 1, maxLength: 2 },
        { key: 'recipientZip',      type: 'text', placeholder: '90001',            label: 'ZIP',            required: true, flex: 2, maxLength: 10 },
      ],
    },
    {
      id: 'disputeType',
      question: "What type of dispute is this?",
      type: 'grid',
    },
    {
      id: 'description',
      question: "What happened?",
      sub: "The more detail, the stronger your letter.",
      fields: [{
        key: 'description', type: 'textarea', required: true, minLength: 50, rows: 5,
        placeholder: "Describe what happened in your own words. Include dates, amounts, and key facts.",
      }],
    },
    {
      id: 'amount',
      question: "What are you demanding?",
      sub: "The specific remedy or amount you're seeking.",
      fields: [{ key: 'amount', type: 'text', placeholder: 'e.g. $2,400 security deposit', required: true }],
    },
    {
      id: 'incidentDate',
      question: "When did this happen?",
      sub: "Approximate date is fine — leave blank if unsure.",
      fields: [{ key: 'incidentDate', type: 'date', required: false }],
    },
    {
      id: 'priorAttempts',
      question: "Have you tried to resolve this already?",
      type: 'yesno',
    },
    ...(answers.priorAttempts === 'yes' ? [{
      id: 'priorAttemptDetails',
      question: "What did you try?",
      sub: "Briefly describe your attempts to resolve this.",
      fields: [{
        key: 'priorAttemptDetails', type: 'textarea', required: true, rows: 3,
        placeholder: "e.g. I called twice and sent an email on March 3rd with no response.",
      }],
    }] : []),
    {
      id: 'deadline',
      question: "How many days should they have to respond?",
      type: 'deadline',
    },
    {
      id: 'tone',
      question: "What tone should the letter take?",
      type: 'tone',
    },
  ];
}

const inputBase = (hasError) => ({
  background: '#0d1828',
  border: `1px solid ${hasError ? '#f87171' : '#1e3054'}`,
  borderRadius: '12px',
  padding: '14px 16px',
  color: '#fff',
  fontSize: '16px',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.15s',
});

export default function IntakeForm({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(true);
  const [dir, setDir] = useState(1);
  const firstRef = useRef(null);

  const questions = buildQuestions(answers);
  const total = questions.length;
  const current = questions[step];

  useEffect(() => {
    if (visible) setTimeout(() => firstRef.current?.focus(), 50);
  }, [step, visible]);

  const set = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (current.type === 'grid') {
      if (!answers.disputeType) errs.disputeType = 'Please select a dispute type.';
    } else if (current.type === 'yesno') {
      if (!answers.priorAttempts) errs.priorAttempts = 'Please select yes or no.';
    } else if (current.type === 'deadline') {
      if (answers.deadline === 'custom' && !answers.customDeadline) errs.customDeadline = 'Please enter a number of days.';
    } else if (current.fields) {
      for (const f of current.fields) {
        if (f.required && !answers[f.key]?.trim()) errs[f.key] = 'Required.';
        if (f.minLength && answers[f.key]?.trim().length < f.minLength)
          errs[f.key] = `Minimum ${f.minLength} characters.`;
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const transition = (newDir, callback) => {
    setDir(newDir);
    setVisible(false);
    setTimeout(() => { callback(); setVisible(true); }, 180);
  };

  const goNext = () => {
    if (!validate()) return;
    if (step === total - 1) { onComplete(answers); return; }
    transition(1, () => setStep(s => s + 1));
  };

  const goBack = () => {
    if (step === 0) return;
    transition(-1, () => setStep(s => s - 1));
  };

  // ── Field renderers ───────────────────────────────────

  const renderInput = (f, isFirst) => {
    const err = errors[f.key];
    const style = inputBase(err);

    if (f.type === 'textarea') {
      return (
        <div key={f.key}>
          <textarea
            ref={isFirst ? firstRef : null}
            value={answers[f.key]}
            onChange={e => set(f.key, e.target.value)}
            placeholder={f.placeholder}
            rows={f.rows || 4}
            style={{ ...style, resize: 'none' }}
            onFocus={e => (e.target.style.borderColor = '#c9a84c')}
            onBlur={e => (e.target.style.borderColor = err ? '#f87171' : '#1e3054')}
          />
          <div className="flex justify-between mt-1">
            {err ? <p className="text-red-400 text-xs">{err}</p> : <span />}
            {f.minLength && (
              <p className="text-white/20 text-xs">
                {answers[f.key]?.length || 0} / {f.minLength} min
              </p>
            )}
          </div>
        </div>
      );
    }

    if (f.type === 'date') {
      return (
        <div key={f.key}>
          <input
            ref={isFirst ? firstRef : null}
            type="date"
            value={answers[f.key]}
            onChange={e => set(f.key, e.target.value)}
            style={{ ...style, colorScheme: 'dark' }}
            onFocus={e => (e.target.style.borderColor = '#c9a84c')}
            onBlur={e => (e.target.style.borderColor = '#1e3054')}
            onKeyDown={e => e.key === 'Enter' && goNext()}
          />
          {err && <p className="text-red-400 text-xs mt-1">{err}</p>}
        </div>
      );
    }

    return (
      <div key={f.key} style={{ flex: f.flex || 1 }}>
        {f.label && <label className="block text-xs mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{f.label}</label>}
        <input
          ref={isFirst ? firstRef : null}
          type={f.type}
          value={answers[f.key]}
          onChange={e => set(f.key, e.target.value.slice(0, f.maxLength || 9999))}
          placeholder={f.placeholder}
          style={style}
          onFocus={e => (e.target.style.borderColor = '#c9a84c')}
          onBlur={e => (e.target.style.borderColor = err ? '#f87171' : '#1e3054')}
          onKeyDown={e => e.key === 'Enter' && goNext()}
        />
        {err && <p className="text-red-400 text-xs mt-1">{err}</p>}
      </div>
    );
  };

  const renderBody = () => {
    // Grid
    if (current.type === 'grid') return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {DISPUTE_TYPES.map(t => (
            <button
              key={t.id}
              onClick={() => set('disputeType', t.label)}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-150"
              style={{
                border: `2px solid ${answers.disputeType === t.label ? '#c9a84c' : 'rgba(255,255,255,0.07)'}`,
                background: answers.disputeType === t.label ? 'rgba(201,168,76,0.09)' : 'transparent',
                color: '#fff',
              }}
            >
              <span className="text-2xl">{t.emoji}</span>
              <span className="text-xs font-medium text-center leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
        {errors.disputeType && <p className="text-red-400 text-xs mt-3">{errors.disputeType}</p>}
      </div>
    );

    // Yes / No
    if (current.type === 'yesno') return (
      <div>
        <div className="flex gap-4">
          {['yes', 'no'].map(v => (
            <button
              key={v}
              onClick={() => { set('priorAttempts', v); setTimeout(goNext, 160); }}
              className="flex-1 py-5 rounded-2xl font-semibold text-base capitalize transition-all duration-150"
              style={{
                border: `2px solid ${answers.priorAttempts === v ? '#c9a84c' : 'rgba(255,255,255,0.07)'}`,
                background: answers.priorAttempts === v ? 'rgba(201,168,76,0.09)' : 'transparent',
                color: answers.priorAttempts === v ? '#c9a84c' : 'rgba(255,255,255,0.55)',
              }}
            >
              {v === 'yes' ? 'Yes' : 'No'}
            </button>
          ))}
        </div>
        {errors.priorAttempts && <p className="text-red-400 text-xs mt-3">{errors.priorAttempts}</p>}
      </div>
    );

    // Deadline
    if (current.type === 'deadline') {
      const opts = [
        { value: '14', label: '14 days', badge: 'Recommended' },
        { value: '30', label: '30 days' },
        { value: 'custom', label: 'Custom' },
      ];
      return (
        <div className="space-y-3">
          {opts.map(o => (
            <button
              key={o.value}
              onClick={() => set('deadline', o.value)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-150"
              style={{
                border: `2px solid ${answers.deadline === o.value ? '#c9a84c' : 'rgba(255,255,255,0.07)'}`,
                background: answers.deadline === o.value ? 'rgba(201,168,76,0.09)' : 'transparent',
              }}
            >
              <span className="text-white font-medium text-sm">{o.label}</span>
              {o.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: 'rgba(201,168,76,0.18)', color: '#c9a84c' }}>
                  {o.badge}
                </span>
              )}
            </button>
          ))}
          {answers.deadline === 'custom' && (
            <div className="mt-1">
              <input
                type="number" min="1" max="180"
                value={answers.customDeadline}
                onChange={e => set('customDeadline', e.target.value)}
                placeholder="Number of days"
                style={inputBase(errors.customDeadline)}
                onFocus={e => (e.target.style.borderColor = '#c9a84c')}
                onBlur={e => (e.target.style.borderColor = '#1e3054')}
                onKeyDown={e => e.key === 'Enter' && goNext()}
              />
              {errors.customDeadline && <p className="text-red-400 text-xs mt-1">{errors.customDeadline}</p>}
            </div>
          )}
        </div>
      );
    }

    // Tone
    if (current.type === 'tone') {
      const opts = [
        { value: 'professional', label: 'Professional & firm', badge: 'Recommended', desc: 'Factual and persuasive' },
        { value: 'aggressive',   label: 'Final warning',       desc: 'Direct — legal action imminent' },
      ];
      return (
        <div className="space-y-3">
          {opts.map(o => (
            <button
              key={o.value}
              onClick={() => set('tone', o.value)}
              className="w-full flex items-start justify-between px-5 py-4 rounded-2xl transition-all duration-150 text-left"
              style={{
                border: `2px solid ${answers.tone === o.value ? '#c9a84c' : 'rgba(255,255,255,0.07)'}`,
                background: answers.tone === o.value ? 'rgba(201,168,76,0.09)' : 'transparent',
              }}
            >
              <div>
                <p className="text-white font-medium text-sm">{o.label}</p>
                <p className="text-white/40 text-xs mt-0.5">{o.desc}</p>
              </div>
              {o.badge && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-3"
                  style={{ background: 'rgba(201,168,76,0.18)', color: '#c9a84c' }}>
                  {o.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      );
    }

    // Fields
    if (!current.fields) return null;
    const hasGrid = current.fields.length > 1 && current.fields.some(f => f.flex);

    if (hasGrid) {
      const [first, ...rest] = current.fields;
      return (
        <div className="space-y-3">
          {renderInput(first, true)}
          <div className="flex gap-3">
            {rest.map((f, i) => renderInput(f, false))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {current.fields.map((f, i) => renderInput(f, i === 0))}
      </div>
    );
  };

  const showEnterHint = current.fields?.length === 1 &&
    !['textarea', 'date'].includes(current.fields[0].type);

  return (
    <div className="flex flex-col" style={{ minHeight: 'calc(100vh - 130px)', background: '#0f1829' }}>

      {/* Progress bar */}
      <div className="px-6 pt-5 pb-0">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
            {step + 1} of {total}
          </span>
          <span className="text-xs font-semibold" style={{ color: '#c9a84c' }}>
            {Math.round(((step + 1) / total) * 100)}%
          </span>
        </div>
        <div className="h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((step + 1) / total) * 100}%`,
              background: 'linear-gradient(to right, #c9a84c, #d4b96a)',
            }}
          />
        </div>
      </div>

      {/* Question area */}
      <div
        className="flex-1 flex flex-col justify-center px-6 py-8 mx-auto w-full"
        style={{
          maxWidth: '560px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : `translateY(${dir > 0 ? '20px' : '-20px'})`,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
        }}
      >
        <div className="mb-7">
          <h2 className="font-bold leading-snug mb-2" style={{ color: '#fff', fontSize: '22px' }}>
            {current.question}
          </h2>
          {current.sub && (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>{current.sub}</p>
          )}
        </div>

        {renderBody()}

        {showEnterHint && (
          <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.18)' }}>
            Press Enter ↵ to continue
          </p>
        )}
      </div>

      {/* Navigation */}
      <div
        className="px-6 pb-8 flex items-center justify-between mx-auto w-full"
        style={{ maxWidth: '560px' }}
      >
        <button
          onClick={goBack}
          className="flex items-center gap-1 text-sm transition-all duration-150"
          style={{ color: 'rgba(255,255,255,0.28)', opacity: step === 0 ? 0 : 1, pointerEvents: step === 0 ? 'none' : 'auto' }}
        >
          <ChevronLeft size={15} /> Back
        </button>

        <button
          onClick={goNext}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)', color: '#1a2744' }}
        >
          {step === total - 1 ? 'Generate My Letter' : 'Next'}
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
