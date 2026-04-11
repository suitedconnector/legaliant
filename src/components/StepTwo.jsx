import { useState } from 'react';
import { Shield, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';

const CLAIM_TYPES = [
  {
    id: 'discrimination',
    label: 'Discrimination',
    desc: 'Fired due to a protected characteristic',
    subTypes: [
      { id: 'age',             label: 'Age (40+)' },
      { id: 'race',            label: 'Race / Ethnicity' },
      { id: 'gender',          label: 'Gender / Sex' },
      { id: 'disability',      label: 'Disability' },
      { id: 'pregnancy',       label: 'Pregnancy' },
      { id: 'religion',        label: 'Religion' },
      { id: 'national_origin', label: 'National Origin' },
    ],
  },
  { id: 'retaliation',             label: 'Retaliation',             desc: 'Fired for reporting misconduct or exercising a right' },
  { id: 'whistleblower',           label: 'Whistleblower',           desc: 'Reported illegal activity or safety violations' },
  { id: 'wrongful_termination',    label: 'Wrongful Termination',    desc: 'Fired in violation of contract or public policy' },
  { id: 'harassment',              label: 'Harassment',              desc: 'Hostile work environment or sexual harassment' },
  { id: 'wage_theft',              label: 'Wage Theft',              desc: 'Unpaid wages, overtime, or final paycheck violations' },
];

export default function StepTwo({ animClass, formData, onUpdate, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const [discOpen, setDiscOpen] = useState(formData.claimTypes.includes('discrimination'));

  const toggleClaim = (id) => {
    const current = formData.claimTypes;
    const next = current.includes(id) ? current.filter(c => c !== id) : [...current, id];
    onUpdate({ claimTypes: next });
    if (id === 'discrimination') {
      setDiscOpen(!current.includes(id));
      if (current.includes(id)) onUpdate({ discriminationSubTypes: [] });
    }
  };

  const toggleSubType = (id) => {
    const current = formData.discriminationSubTypes;
    const next = current.includes(id) ? current.filter(s => s !== id) : [...current, id];
    onUpdate({ discriminationSubTypes: next });
  };

  const handleNext = () => {
    if (formData.claimTypes.length === 0) {
      setErrors({ claimTypes: 'Please select at least one claim type' });
      return;
    }
    if (formData.claimTypes.includes('discrimination') && formData.discriminationSubTypes.length === 0) {
      setErrors({ discSub: 'Please select the type of discrimination' });
      return;
    }
    setErrors({});
    onNext();
  };

  return (
    <div className={`${animClass} pt-8`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-2">
          <Shield size={13} />
          Step 2 of 4
        </div>
        <h2 className="font-serif text-navy text-2xl font-bold">What Happened to You?</h2>
        <p className="text-gray-500 text-sm mt-1">
          Select all that may apply. Each claim type affects your potential recovery.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 space-y-3">
        {CLAIM_TYPES.map((claim) => {
          const isChecked = formData.claimTypes.includes(claim.id);
          return (
            <div key={claim.id}>
              <label className={`check-item ${isChecked ? 'checked' : ''}`}>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={isChecked}
                  onChange={() => toggleClaim(claim.id)}
                />
                {/* Custom checkbox */}
                <div className={[
                  'w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all duration-150',
                  isChecked ? 'bg-navy border-navy' : 'border-gray-300',
                ].join(' ')}>
                  {isChecked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy text-sm">{claim.label}</span>
                    {claim.subTypes && isChecked && (
                      <button
                        type="button"
                        onClick={e => { e.preventDefault(); setDiscOpen(o => !o); }}
                        className="text-gold ml-2"
                      >
                        <ChevronDown size={15} className={`transition-transform duration-200 ${discOpen ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{claim.desc}</p>
                </div>
              </label>

              {/* Discrimination sub-types */}
              {claim.subTypes && isChecked && discOpen && (
                <div className="mt-2 ml-8 p-4 bg-navy/3 rounded-xl border border-navy/8 step-enter-up">
                  <p className="text-xs font-semibold text-navy mb-3 uppercase tracking-wide">
                    What type of discrimination?
                  </p>
                  {errors.discSub && (
                    <p className="text-red-500 text-xs mb-2">{errors.discSub}</p>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {claim.subTypes.map(sub => {
                      const isSubChecked = formData.discriminationSubTypes.includes(sub.id);
                      return (
                        <label
                          key={sub.id}
                          className={[
                            'flex items-center gap-2 p-2 rounded-lg border cursor-pointer text-sm transition-all duration-150',
                            isSubChecked ? 'border-navy bg-navy text-white' : 'border-gray-200 text-navy hover:border-gold',
                          ].join(' ')}
                        >
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={isSubChecked}
                            onChange={() => toggleSubType(sub.id)}
                          />
                          <div className={[
                            'w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0',
                            isSubChecked ? 'bg-gold border-gold' : 'border-current',
                          ].join(' ')}>
                            {isSubChecked && (
                              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                <path d="M1 3L3 5L7 1" stroke="#1a2744" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                          {sub.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {errors.claimTypes && (
          <p className="text-red-500 text-xs pt-1">{errors.claimTypes}</p>
        )}
      </div>

      {/* Helpful note */}
      <div className="mt-4 px-4 py-3 rounded-xl bg-gold/8 border border-gold/20 flex gap-3">
        <div className="text-gold mt-0.5 flex-shrink-0">💡</div>
        <p className="text-xs text-navy/70 leading-relaxed">
          <strong className="text-navy">Tip:</strong> California's FEHA provides stronger protections than federal law,
          with no cap on emotional distress or punitive damages in discrimination cases.
        </p>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between">
        <button onClick={onBack} className="btn-outline">
          <ArrowLeft size={16} />
          Back
        </button>
        <button onClick={handleNext} className="btn-gold text-base">
          Next: Evidence
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
