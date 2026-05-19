'use client';

import { useState } from 'react';
import { FileSearch, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'documentedEvidence',
    question: 'Do you have documented evidence?',
    hint: 'Emails, texts, performance reviews, written warnings, termination letters',
    impact: 'Strong evidence significantly increases case value and chances of success.',
  },
  {
    id: 'hrComplaintsFiled',
    question: 'Did you file a complaint with HR?',
    hint: 'Internal HR complaint, ethics hotline, or management report before termination',
    impact: 'Prior complaints establish a timeline and support retaliation claims.',
  },
  {
    id: 'witnesses',
    question: 'Do you have witnesses?',
    hint: 'Coworkers or others who witnessed the discrimination, harassment, or termination',
    impact: 'Witness testimony can corroborate your account and strengthen negotiations.',
  },
  {
    id: 'signedSeverance',
    question: 'Did you sign a severance agreement?',
    hint: 'A signed agreement may waive certain claims — an attorney should review it',
    impact: 'A signed severance may limit your options. An attorney can assess its enforceability.',
    cautionIfYes: true,
  },
];

function YesNoToggle({ value, onChange, cautionIfYes }) {
  return (
    <div className="flex gap-3 mt-3">
      {[
        { val: 'yes', label: 'Yes' },
        { val: 'no',  label: 'No' },
      ].map(({ val, label }) => {
        const isActive = value === val;
        const isCaution = cautionIfYes && val === 'yes' && isActive;
        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={[
              'flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200',
              isCaution
                ? 'bg-amber-50 border-amber-300 text-amber-700'
                : isActive
                  ? 'bg-navy border-navy text-white'
                  : 'bg-white border-gray-200 text-navy hover:border-gold',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default function StepThree({ animClass, formData, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [tooltip, setTooltip] = useState(null);

  const validate = () => {
    const e = {};
    QUESTIONS.forEach(q => {
      if (!formData[q.id]) e[q.id] = 'Please answer this question';
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) onNext(); };

  return (
    <div className={`${animClass} pt-8`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-2">
          <FileSearch size={13} />
          Step 3 of 4
        </div>
        <h2 className="font-serif text-navy text-2xl font-bold">Evidence &amp; Circumstances</h2>
        <p className="text-gray-500 text-sm mt-1">
          The strength of your evidence is one of the biggest factors in case value.
        </p>
      </div>

      <div className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl shadow-card border border-gray-100 p-5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-navy text-sm leading-snug">{q.question}</h3>
              <button
                type="button"
                className="text-gray-300 hover:text-gold transition-colors flex-shrink-0 mt-0.5"
                onClick={() => setTooltip(tooltip === q.id ? null : q.id)}
                aria-label="More info"
              >
                <HelpCircle size={16} />
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-1">{q.hint}</p>

            {tooltip === q.id && (
              <div className="mt-2 px-3 py-2 bg-navy/4 rounded-lg border border-navy/8 step-enter-up">
                <p className="text-xs text-navy/70 leading-relaxed">
                  <strong className="text-navy">Why it matters:</strong> {q.impact}
                </p>
              </div>
            )}

            <YesNoToggle
              value={formData[q.id]}
              onChange={val => onUpdate({ [q.id]: val })}
              cautionIfYes={q.cautionIfYes}
            />

            {q.cautionIfYes && formData[q.id] === 'yes' && (
              <p className="text-amber-600 text-xs mt-2 flex items-center gap-1.5">
                ⚠️ An attorney should review your severance agreement — some waivers are unenforceable under California law.
              </p>
            )}

            {errors[q.id] && (
              <p className="text-red-500 text-xs mt-2">{errors[q.id]}</p>
            )}
          </div>
        ))}
      </div>

      {Object.keys(formData).filter(k =>
        ['documentedEvidence','hrComplaintsFiled','witnesses','signedSeverance'].includes(k) && formData[k]
      ).length >= 2 && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 step-enter-up">
          <p className="text-xs text-green-700">
            <strong>Your evidence profile is taking shape.</strong> A full breakdown of how each
            factor affects your case will be included in your personalized analysis.
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="btn-outline">
          <ArrowLeft size={16} />
          Back
        </button>
        <button onClick={handleNext} className="btn-gold text-base">
          See My Estimate
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
