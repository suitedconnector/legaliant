import { useState } from 'react';
import { User, Mail, Phone, FileText, ArrowLeft, Unlock, Loader2 } from 'lucide-react';

function Label({ children, hint }) {
  return (
    <label className="block text-sm font-semibold text-navy mb-1.5">
      {children}
      {hint && <span className="font-normal text-gray-400 ml-1.5 text-xs">{hint}</span>}
    </label>
  );
}

function FieldIcon({ icon: Icon, children }) {
  return (
    <div className="relative">
      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
        <Icon size={16} />
      </div>
      <div className="pl-9">{children}</div>
    </div>
  );
}

export default function StepFour({ animClass, formData, onUpdate, onSubmit, onBack }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Full name is required';
    if (!formData.email.trim()) {
      e.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      e.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      e.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.tcpaConsent) {
      e.tcpaConsent = 'You must agree to be contacted to receive your analysis';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const formatPhone = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit();
  };

  return (
    <div className={`${animClass} pt-8`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-2">
          <Unlock size={13} />
          Step 4 of 4
        </div>
        <h2 className="font-serif text-navy text-2xl font-bold">Unlock Your Analysis</h2>
        <p className="text-gray-500 text-sm mt-1">
          Enter your details to receive your full AI-powered case analysis and be
          connected with a California employment attorney.
        </p>
      </div>

      {/* What you're unlocking */}
      <div className="mb-5 p-4 rounded-2xl border border-gold/25 bg-gold/5">
        <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-2">
          You're unlocking:
        </p>
        <div className="space-y-1.5">
          {[
            'Full settlement range with low / likely / high breakdown',
            'Personalized damage category estimates',
            'Key case strengths and weaknesses',
            'Specific next steps for your situation',
            'Free consultation with a California employment attorney',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-navy/80">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6 space-y-5">

          {/* Name */}
          <div>
            <Label>Full Name</Label>
            <FieldIcon icon={User}>
              <input
                className="input-gold pl-9"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                value={formData.name}
                onChange={e => onUpdate({ name: e.target.value })}
              />
            </FieldIcon>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <Label>Email Address</Label>
            <FieldIcon icon={Mail}>
              <input
                className="input-gold pl-9"
                type="email"
                autoComplete="email"
                placeholder="jane@email.com"
                value={formData.email}
                onChange={e => onUpdate({ email: e.target.value })}
              />
            </FieldIcon>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <Label>Phone Number</Label>
            <FieldIcon icon={Phone}>
              <input
                className="input-gold pl-9"
                type="tel"
                autoComplete="tel"
                placeholder="(415) 555-0100"
                value={formData.phone}
                onChange={e => onUpdate({ phone: formatPhone(e.target.value) })}
              />
            </FieldIcon>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Situation description */}
          <div>
            <Label hint="optional but helps the AI">Brief Description of Your Situation</Label>
            <div className="relative">
              <div className="absolute left-3.5 top-3.5 pointer-events-none text-gold">
                <FileText size={16} />
              </div>
              <textarea
                className="input-gold pl-9 resize-none"
                rows={4}
                placeholder="Briefly describe what happened — the more context, the more accurate your analysis will be..."
                value={formData.situationDescription}
                onChange={e => onUpdate({ situationDescription: e.target.value })}
              />
            </div>
          </div>

          {/* TCPA Consent */}
          <div>
            <label className={[
              'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150',
              formData.tcpaConsent ? 'border-navy bg-navy/3' : 'border-gray-200 hover:border-gold/50',
            ].join(' ')}>
              <input
                type="checkbox"
                className="hidden"
                checked={formData.tcpaConsent}
                onChange={e => onUpdate({ tcpaConsent: e.target.checked })}
              />
              <div className={[
                'w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 mt-0.5 transition-all',
                formData.tcpaConsent ? 'bg-navy border-navy' : 'border-gray-300',
              ].join(' ')}>
                {formData.tcpaConsent && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                By submitting this form I consent to be contacted by Legaliant and licensed
                California employment attorneys in its network via phone, text, and email
                regarding my legal matter. Reply STOP to opt out of texts.{' '}
                <span className="text-gold underline cursor-pointer">View our Privacy Policy.</span>
              </p>
            </label>
            {errors.tcpaConsent && <p className="text-red-500 text-xs mt-1.5">{errors.tcpaConsent}</p>}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between items-center">
          <button type="button" onClick={onBack} className="btn-outline">
            <ArrowLeft size={16} />
            Back
          </button>
          <button type="submit" className="btn-gold text-base px-10 py-4">
            <Unlock size={18} />
            Generate My Analysis
          </button>
        </div>

        <p className="text-center text-gray-400 text-xs mt-4 leading-relaxed">
          Your information is kept strictly confidential. We never sell your data.
        </p>
      </form>
    </div>
  );
}
