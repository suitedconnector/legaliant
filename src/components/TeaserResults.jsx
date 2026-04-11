import { useState } from 'react';
import { Lock, Unlock, TrendingUp, Mail, Phone, User, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

/* ─── Estimate calculation ─────────────────────────────────── */
function fmt(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${n.toLocaleString()}`;
}

function calcEstimate(formData) {
  const salary = parseFloat(String(formData.annualSalary || '').replace(/,/g, '')) || 60000;
  const years  = parseFloat(formData.yearsEmployed) || 1;
  const days   = parseFloat(formData.daysSinceTermination) || 90;
  const isReemployed = formData.currentlyEmployed === 'yes';
  const newSalary    = parseFloat(String(formData.newSalary || '').replace(/,/g, '')) || 0;
  const claimTypes   = formData.claimTypes || [];

  let backPay = 0;
  if (isReemployed && newSalary < salary) {
    backPay = Math.max(0, (salary - newSalary) / 365 * days);
  } else if (!isReemployed) {
    backPay = (salary / 365) * days;
  }

  const frontPayYears = isReemployed ? 0 : Math.min(Math.max(years * 0.4, 0.5), 2);
  const frontPay = salary * frontPayYears;

  let ed = 30000;
  if (claimTypes.includes('discrimination')) ed += 80000;
  if (claimTypes.includes('harassment'))    ed += 60000;
  if (claimTypes.includes('retaliation'))   ed += 50000;
  if (claimTypes.includes('whistleblower')) ed += 45000;

  let ev = 0.55;
  if (formData.documentedEvidence === 'yes') ev += 0.22;
  if (formData.hrComplaintsFiled   === 'yes') ev += 0.12;
  if (formData.witnesses           === 'yes') ev += 0.10;
  if (formData.signedSeverance     === 'no')  ev += 0.06;

  let punitive = 0;
  if (
    (claimTypes.includes('discrimination') || claimTypes.includes('retaliation')) &&
    formData.documentedEvidence === 'yes'
  ) {
    punitive = (backPay + frontPay) * 0.6 * ev;
  }

  const base = backPay + frontPay + ed + punitive;
  const low  = Math.max(Math.round(base * 0.35 / 5000) * 5000, 15000);
  const mid  = Math.max(Math.round(base * 0.70 / 5000) * 5000, 35000);
  const high = Math.max(Math.round(base * 1.25 / 5000) * 5000, 60000);
  return { low, mid, high };
}

/* ─── Phone formatter ──────────────────────────────────────── */
function fmtPhone(val) {
  const d = val.replace(/\D/g, '').slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0,3)}) ${d.slice(3)}`;
  return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
}

/* ─── What they unlock (bullet list) ──────────────────────── */
const UNLOCKS = [
  'Full settlement range — low, likely, and maximum',
  'Breakdown of every damage category with estimates',
  'Key strengths and weaknesses of your specific case',
  'Prioritized next steps tailored to your situation',
  'Free case review with a California employment attorney',
];

/* ─── Main component ───────────────────────────────────────── */
export default function TeaserResults({ animClass, formData, onSubmit }) {
  const { low, mid, high } = calcEstimate(formData);
  const claimCount    = (formData.claimTypes || []).length;
  const evidenceScore = [
    formData.documentedEvidence === 'yes',
    formData.hrComplaintsFiled  === 'yes',
    formData.witnesses          === 'yes',
  ].filter(Boolean).length;

  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '', phone: '', situationDescription: '',
    tcpaConsent: false,
  });
  const [errors, setErrors]       = useState({});
  const [unlocking, setUnlocking] = useState(false); // animation state
  const [unlocked,  setUnlocked]  = useState(false); // post-animation

  const set = (k, v) => setFields(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!fields.email.trim()) {
      e.email = 'Email address is required to unlock your analysis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = 'Please enter a valid email address';
    }
    if (!fields.tcpaConsent) {
      e.tcpaConsent = 'Please agree to be contacted to receive your analysis';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unlocking) return;
    if (!validate()) return;

    const leadData = {
      name: [fields.firstName, fields.lastName].filter(Boolean).join(' ') || 'Anonymous',
      email: fields.email,
      phone: fields.phone,
      situationDescription: fields.situationDescription,
      tcpaConsent: fields.tcpaConsent,
    };

    setUnlocking(true);

    // Phase 1: lock → unlocked icon (600ms)
    setTimeout(() => setUnlocked(true), 650);

    // Phase 2: navigate to results after animation completes (1.3s)
    setTimeout(() => onSubmit(leadData), 1300);
  };

  return (
    <div className={`${animClass} pt-8`}>

      {/* ── Teaser: blurred estimate ───────────────────────── */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-gold text-xs font-semibold tracking-widest uppercase mb-4">
          <TrendingUp size={13} />
          Your Preliminary Estimate
        </div>

        <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
          {/* Dark header */}
          <div className="bg-navy px-6 pt-5 pb-3">
            <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-0.5">
              Estimated Settlement Range
            </p>
            <p className="text-white/35 text-xs">California jurisdiction · {claimCount} claim{claimCount !== 1 ? 's' : ''} · {evidenceScore}/3 evidence factors</p>
          </div>

          {/* Blurred numbers */}
          <div className="relative px-6 py-8">
            {/* The actual numbers — blurred behind the overlay */}
            <div className="blur-cover flex items-end justify-around select-none" aria-hidden="true">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Conservative</p>
                <p className="text-3xl font-bold text-gray-200 font-serif">{fmt(low)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1.5">Likely Range</p>
                <p className="text-5xl font-bold text-navy font-serif">{fmt(mid)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-1">Maximum</p>
                <p className="text-3xl font-bold text-gray-200 font-serif">{fmt(high)}</p>
              </div>
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/85 backdrop-blur-[3px]">
              {/* Padlock icon with unlock animation */}
              <div
                className={[
                  'w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-500',
                  unlocking && !unlocked ? 'animate-unlock-shake' : '',
                  unlocked ? 'scale-110' : '',
                ].join(' ')}
                style={{
                  background: unlocked
                    ? 'linear-gradient(135deg, #c9a84c, #d4b96a)'
                    : 'linear-gradient(135deg, #1a2744, #243358)',
                  border: `2px solid ${unlocked ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.25)'}`,
                  boxShadow: unlocked ? '0 0 32px 8px rgba(201,168,76,0.35)' : undefined,
                }}
              >
                {unlocked
                  ? <Unlock size={28} className="text-navy" strokeWidth={2.5} />
                  : <Lock   size={26} className="text-gold"  strokeWidth={2} />
                }
              </div>

              {unlocked ? (
                <div className="text-center step-enter-up">
                  <p className="font-semibold text-emerald-600 text-sm flex items-center gap-1.5">
                    <CheckCircle2 size={15} /> Analysis unlocked — loading your results…
                  </p>
                </div>
              ) : (
                <div className="text-center px-4">
                  <h3 className="font-serif text-navy text-xl font-bold mb-1">
                    Your Case Analysis Is Ready
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-[260px]">
                    Enter your details below to unlock your full personalized
                    settlement estimate and receive your free case review.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Urgency strip */}
      <div className="flex gap-2.5 items-center p-3.5 rounded-xl bg-amber-50 border border-amber-200 mb-6">
        <AlertCircle size={15} className="text-amber-500 flex-shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          <strong>Time-sensitive:</strong> California DFEH/CRD complaint deadline is typically 3 years.
          Act now to protect your rights.
        </p>
      </div>

      {/* ── Unlock form ────────────────────────────────────── */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-6">

          {/* What you unlock */}
          <div className="mb-6 pb-5 border-b border-gray-100">
            <p className="text-xs font-semibold text-navy uppercase tracking-widest mb-3">
              Your analysis includes:
            </p>
            <div className="space-y-1.5">
              {UNLOCKS.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm text-navy/75">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Name row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">
                First Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                  <User size={15} />
                </div>
                <input
                  className="input-gold pl-8"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Jane"
                  value={fields.firstName}
                  onChange={e => set('firstName', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-navy mb-1.5">
                Last Name
              </label>
              <input
                className="input-gold"
                type="text"
                autoComplete="family-name"
                placeholder="Smith"
                value={fields.lastName}
                onChange={e => set('lastName', e.target.value)}
              />
            </div>
          </div>

          {/* Email — required */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-navy mb-1.5">
              Email Address
              <span className="text-gold ml-1.5 text-xs font-medium">Required</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                <Mail size={15} />
              </div>
              <input
                className="input-gold pl-9"
                type="email"
                autoComplete="email"
                placeholder="jane@email.com"
                value={fields.email}
                onChange={e => { set('email', e.target.value); if (errors.email) setErrors(p => ({...p, email: ''})); }}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.email}
              </p>
            )}
          </div>

          {/* Phone — optional */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-navy mb-1.5">
              Phone Number
              <span className="text-gray-400 ml-1.5 text-xs font-normal">Optional</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gold pointer-events-none">
                <Phone size={15} />
              </div>
              <input
                className="input-gold pl-9"
                type="tel"
                autoComplete="tel"
                placeholder="(415) 555-0100"
                value={fields.phone}
                onChange={e => set('phone', fmtPhone(e.target.value))}
              />
            </div>
            <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1">
              <Phone size={10} className="text-gold" />
              Attorneys can reach you faster with a phone number — speeds up your case review.
            </p>
          </div>

          {/* Situation description */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-navy mb-1.5">
              Brief Description of Your Situation
              <span className="text-gray-400 ml-1.5 text-xs font-normal">Optional — helps your AI analysis</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3.5 text-gold pointer-events-none">
                <FileText size={15} />
              </div>
              <textarea
                className="input-gold pl-9 resize-none"
                rows={3}
                placeholder="Briefly describe what happened — why you believe you were wrongfully terminated, any patterns of discrimination or retaliation, etc. (3–4 sentences)"
                value={fields.situationDescription}
                onChange={e => set('situationDescription', e.target.value)}
              />
            </div>
          </div>

          {/* TCPA Consent */}
          <div className="mb-5">
            <label className={[
              'flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150',
              fields.tcpaConsent ? 'border-navy bg-navy/3' : errors.tcpaConsent ? 'border-red-300 bg-red-50/50' : 'border-gray-200 hover:border-navy/30',
            ].join(' ')}>
              <input
                type="checkbox"
                className="hidden"
                checked={fields.tcpaConsent}
                onChange={e => { set('tcpaConsent', e.target.checked); if (errors.tcpaConsent) setErrors(p => ({...p, tcpaConsent: ''})); }}
              />
              {/* Custom checkbox */}
              <div className={[
                'w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 mt-0.5 transition-all',
                fields.tcpaConsent ? 'bg-navy border-navy' : errors.tcpaConsent ? 'border-red-400' : 'border-gray-300',
              ].join(' ')}>
                {fields.tcpaConsent && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="#c9a84c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                By submitting this form I consent to be contacted by Legaliant and licensed
                California employment attorneys in its network via phone, text, and email
                regarding my legal matter. Reply STOP to opt out of texts.{' '}
                <span className="text-gold underline-offset-2 underline cursor-pointer">View our Privacy Policy.</span>
              </p>
            </label>
            {errors.tcpaConsent && (
              <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.tcpaConsent}
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={unlocking}
            className={[
              'w-full py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2.5 transition-all duration-300',
              unlocking
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:-translate-y-0.5',
            ].join(' ')}
            style={{
              background: unlocked
                ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                : 'linear-gradient(135deg, #c9a84c 0%, #d4b96a 50%, #c9a84c 100%)',
              backgroundSize: '200% 100%',
              color: '#1a2744',
              boxShadow: unlocking ? '0 8px 24px -4px rgba(201,168,76,0.4)' : undefined,
            }}
          >
            {unlocked ? (
              <>
                <Unlock size={18} strokeWidth={2.5} />
                Unlocking Your Analysis…
              </>
            ) : unlocking ? (
              <>
                <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                Unlocking…
              </>
            ) : (
              <>
                <Lock size={18} strokeWidth={2} />
                Unlock My Case Analysis
              </>
            )}
          </button>

          {/* Trust footer */}
          <p className="text-center text-gray-400 text-xs mt-3 leading-relaxed">
            No spam. No pressure.{' '}
            <span className="underline underline-offset-2 cursor-pointer hover:text-gold transition-colors">
              Your information is protected by our Privacy Policy.
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
