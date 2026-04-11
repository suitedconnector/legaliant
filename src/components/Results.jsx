import { useEffect, useState } from 'react';
import {
  Scale, TrendingUp, TrendingDown, Minus,
  CheckCircle2, AlertTriangle, Phone, ArrowRight,
  Shield, FileText, Award, BarChart3, Clock, ChevronDown, ChevronUp,
  Download, RefreshCw, Quote,
} from 'lucide-react';
import DamageChart from './DamageChart.jsx';

/* ─── Helpers ──────────────────────────────────────────────── */
function fmtUSD(n) {
  if (!n || isNaN(n)) return '—';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${Number(n).toLocaleString()}`;
}

const STRENGTH_COLORS = {
  'Weak':       { bar: 'bg-red-500',    badge: 'bg-red-50 text-red-700 border-red-200',    pct: 22 },
  'Moderate':   { bar: 'bg-amber-400',  badge: 'bg-amber-50 text-amber-700 border-amber-200', pct: 50 },
  'Strong':     { bar: 'bg-emerald-500',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', pct: 75 },
  'Very Strong':{ bar: 'bg-emerald-500',badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', pct: 92 },
};

const IMPACT_ICON = {
  positive: <TrendingUp  size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />,
  negative: <TrendingDown size={14} className="text-red-400   flex-shrink-0 mt-0.5" />,
  neutral:  <Minus        size={14} className="text-gray-400  flex-shrink-0 mt-0.5" />,
};

/* ─── Loading screen ───────────────────────────────────────── */
const LOADING_STEPS = [
  'Analyzing your case details…',
  'Reviewing California FEHA statutes…',
  'Calculating damage estimates…',
  'Identifying key case factors…',
  'Preparing your personalized analysis…',
];

function LoadingScreen() {
  const [phase, setPhase] = useState(0);
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => Math.min(p + 1, LOADING_STEPS.length - 1));
    }, 1800);
    const bar = setInterval(() => {
      setBarWidth(w => Math.min(w + 1, 95));
    }, 120);
    return () => { clearInterval(interval); clearInterval(bar); };
  }, []);

  return (
    <div className="min-h-screen hero-bg flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        {/* Animated logo */}
        <div className="w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center animate-float"
          style={{ background: 'linear-gradient(135deg, #243358, #1a2744)', border: '2px solid rgba(201,168,76,0.3)' }}>
          <Scale size={36} className="text-gold" />
        </div>

        <h2 className="font-serif text-white text-2xl font-bold mb-2">
          Analyzing Your Case
        </h2>
        <p className="text-white/50 text-sm mb-10">
          Our AI is reviewing California employment law and generating your personalized analysis.
        </p>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1 mb-4 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${barWidth}%`, background: 'linear-gradient(90deg, #c9a84c, #d4b96a)' }}
          />
        </div>

        {/* Step labels */}
        <div className="space-y-2">
          {LOADING_STEPS.map((s, i) => (
            <div
              key={i}
              className={[
                'flex items-center gap-2 text-sm transition-all duration-500',
                i < phase   ? 'text-gold/60' :
                i === phase ? 'text-white' : 'text-white/20',
              ].join(' ')}
            >
              <div className={[
                'w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0 border',
                i < phase   ? 'bg-gold/20 border-gold/40 text-gold' :
                i === phase ? 'border-gold text-gold animate-shimmer' : 'border-white/15 text-white/20',
              ].join(' ')}>
                {i < phase ? '✓' : i + 1}
              </div>
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Error screen ─────────────────────────────────────────── */
function ErrorScreen({ error, onRetry }) {
  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-navy-lg">
        <AlertTriangle size={40} className="text-amber-400 mx-auto mb-4" />
        <h2 className="font-serif text-navy text-xl font-bold mb-2">Analysis Unavailable</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{error}</p>
        <button onClick={onRetry} className="btn-navy w-full justify-center">
          Try Again
        </button>
        <p className="text-xs text-gray-400 mt-4">
          If the issue persists, please contact us at{' '}
          <a href="mailto:support@legaliant.com" className="text-gold underline">support@legaliant.com</a>
        </p>
      </div>
    </div>
  );
}

/* ─── Damage category card ─────────────────────────────────── */
function DamageCard({ category, description, estimatedRange, notes }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-card-hover transition-shadow duration-200">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <p className="font-semibold text-navy text-sm">{category}</p>
          <p className="text-gray-400 text-xs mt-0.5">{description}</p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
          <span className="text-gold font-bold text-sm">{estimatedRange}</span>
          {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>
      {open && notes && (
        <div className="px-5 pb-4 border-t border-gray-50 pt-3">
          <p className="text-xs text-gray-500 leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
}

/* ─── Main Results component ───────────────────────────────── */
export default function Results({ analysis, isLoading, error, onRetry, formData }) {
  const [strengthWidth, setStrengthWidth] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!analysis) return;
    // Small delay so the fade-in feels intentional after the loading screen clears
    const revealTimer = setTimeout(() => setRevealed(true), 80);
    const strengthTimer = setTimeout(() => {
      const s = STRENGTH_COLORS[analysis.caseStrength];
      if (s) setStrengthWidth(s.pct);
    }, 600);
    return () => { clearTimeout(revealTimer); clearTimeout(strengthTimer); };
  }, [analysis]);

  if (isLoading || (!analysis && !error)) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={onRetry} />;

  // Handle raw text fallback
  if (analysis?.parseError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="hero-bg py-10 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Scale size={24} className="text-gold" />
              <span className="font-serif text-white text-xl font-bold">Legaliant</span>
            </div>
            <h1 className="font-serif text-white text-3xl font-bold mb-2">Your Case Analysis</h1>
          </div>
          <div className="gold-rule mt-6" />
        </div>
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h2 className="font-serif text-navy text-xl font-bold mb-4">Attorney Analysis</h2>
            <div className="prose prose-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {analysis.rawText}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const strength = STRENGTH_COLORS[analysis.caseStrength] || STRENGTH_COLORS['Moderate'];
  const firstName = (formData?.name || '').split(' ')[0] || 'Your';
  
  // Personalization calculations
  const salary = parseFloat(String(formData?.annualSalary || '').replace(/,/g, '')) || 0;
  const daysSinceTermination = parseFloat(formData?.daysSinceTermination) || 0;
  const backPayEstimate = salary / 365 * daysSinceTermination;

  return (
    <div
      className="copyright-protected min-h-screen bg-gray-50 transition-opacity duration-700 ease-out"
      style={{ opacity: revealed ? 1 : 0, transform: revealed ? 'none' : 'translateY(12px)', transition: 'opacity 0.65s ease-out, transform 0.65s ease-out' }}
    >
      {/* ─── Results Header ─── */}
      <div className="hero-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 opacity-5 rounded-full"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(25%,-25%)' }} />

        <div className="relative max-w-3xl mx-auto px-4 pt-8 pb-10">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center border border-gold/25">
              <Scale size={16} className="text-gold" />
            </div>
            <span className="font-serif text-white font-bold text-lg tracking-wide">Legaliant</span>
            <span className="ml-auto text-white/30 text-xs">Confidential Case Analysis</span>
          </div>

          {/* Title */}
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            {firstName}'s Case Analysis
          </p>
          <h1 className="font-serif text-white text-3xl md:text-4xl font-bold mb-3">
            California Wrongful Termination
          </h1>
          <p className="text-white/60 text-sm max-w-xl leading-relaxed">{analysis.summary}</p>

          {/* Case strength */}
          <div className="mt-6 flex items-center gap-4">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${strength.badge}`}>
              {analysis.caseStrength} Case
            </span>
            <div className="flex-1 max-w-[180px]">
              <div className="strength-bar">
                <div
                  className={`strength-fill ${strength.bar}`}
                  style={{ width: `${strengthWidth}%` }}
                />
              </div>
            </div>
            <span className="text-white/40 text-xs">{analysis.caseStrengthScore}/10</span>
          </div>

          {analysis.strongestClaims?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {analysis.strongestClaims.map(c => (
                <span key={c} className="text-xs bg-white/10 text-white/70 px-2.5 py-1 rounded-full border border-white/15">
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="gold-rule" />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 step-enter-up">

        {/* ─── Settlement Range ─── */}
        <div className="bg-navy rounded-2xl overflow-hidden shadow-navy-lg">
          <div className="px-6 pt-6 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <Award size={16} className="text-gold" />
              <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Estimated Settlement Range
              </p>
            </div>
            <p className="text-white/40 text-xs">{analysis.caseStrengthRationale}</p>
          </div>

          <div className="px-6 py-6 grid grid-cols-3 gap-4">
            {[
              { label: 'Conservative', val: analysis.settlementRange?.low,  sub: 'Low offer' },
              { label: 'Likely Range', val: analysis.settlementRange?.mid,  sub: 'Target', big: true },
              { label: 'Maximum',      val: analysis.settlementRange?.high, sub: 'Best case' },
            ].map(({ label, val, sub, big }) => (
              <div key={label} className={`text-center ${big ? 'relative' : ''}`}>
                {big && (
                  <div className="absolute -inset-2 rounded-xl opacity-20"
                    style={{ background: 'radial-gradient(circle, #c9a84c, transparent)' }} />
                )}
                <p className="text-white/40 text-xs mb-1">{label}</p>
                <p className={`font-bold text-gold ${big ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                  {fmtUSD(val)}
                </p>
                <p className="text-white/30 text-xs mt-1">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Personalization Section */}
        {salary > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={15} className="text-gold" />
              <h2 className="font-serif text-navy text-lg font-bold">Your Calculated Damages</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-navy/5 rounded-xl">
                <p className="text-gray-500 text-xs mb-1">Your Salary</p>
                <p className="text-navy font-bold text-lg">{fmtUSD(salary)}</p>
              </div>
              <div className="text-center p-4 bg-navy/5 rounded-xl">
                <p className="text-gray-500 text-xs mb-1">Days Since Termination</p>
                <p className="text-navy font-bold text-lg">{Math.round(daysSinceTermination)}</p>
              </div>
              <div className="text-center p-4 bg-gold/10 rounded-xl border border-gold/25">
                <p className="text-gray-500 text-xs mb-1">Estimated Back Pay</p>
                <p className="text-navy font-bold text-lg">{fmtUSD(backPayEstimate)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Damage Chart */}
        {analysis.damageCategories?.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 size={15} className="text-gold" />
                <h2 className="font-serif text-navy text-lg font-bold">Detailed Breakdown</h2>
              </div>
              <div className="space-y-2">
                {analysis.damageCategories.map((cat) => (
                  <DamageCard key={cat.category} {...cat} />
                ))}
              </div>
            </div>
            <DamageChart damageCategories={analysis.damageCategories} />
          </div>
        )}

        {/* ─── Key Factors ─── */}
        {analysis.keyFactors?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield size={15} className="text-gold" />
              <h2 className="font-serif text-navy text-lg font-bold">Key Case Factors</h2>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card divide-y divide-gray-50">
              {analysis.keyFactors.map((f, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-4">
                  {IMPACT_ICON[f.impact] || IMPACT_ICON.neutral}
                  <div>
                    <p className="font-semibold text-navy text-sm">{f.factor}</p>
                    <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Next Steps ─── */}
        {analysis.nextSteps?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-gold" />
              <h2 className="font-serif text-navy text-lg font-bold">Recommended Next Steps</h2>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 space-y-4">
              {analysis.nextSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-gold text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-navy/80 text-sm leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Urgency note ─── */}
        {analysis.urgencyNote && (
          <div className="flex gap-3 items-start p-4 rounded-xl bg-amber-50 border border-amber-200">
            <Clock size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800 text-sm mb-0.5">Time-Sensitive</p>
              <p className="text-amber-700 text-xs leading-relaxed">{analysis.urgencyNote}</p>
            </div>
          </div>
        )}

        {/* Export & Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => window.print()}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-200 rounded-xl text-navy font-semibold hover:bg-gray-50 transition-colors"
          >
            <Download size={16} />
            Download PDF Report
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-white border border-gray-200 rounded-xl text-navy font-semibold hover:bg-gray-50 transition-colors"
          >
            <RefreshCw size={16} />
            Recalculate Analysis
          </button>
        </div>

        
        {/* CTA */}
        <div className="bg-navy rounded-2xl overflow-hidden shadow-navy-lg">
          <div className="px-6 py-8 text-center">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)' }}>
              <Phone size={22} className="text-navy" />
            </div>
            <h3 className="font-serif text-white text-2xl font-bold mb-2">
              Speak With an Attorney Today
            </h3>
            <p className="text-white/60 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
              A licensed California employment attorney in our network will review your
              case at no charge. Most cases are handled on contingency -- you pay nothing
              unless you win.
            </p>
            <a
              href="tel:+18005551234"
              className="btn-gold text-base py-4 px-10 rounded-xl inline-flex items-center gap-2 shadow-gold-lg"
            >
              <Phone size={18} />
              Request a Free Consultation
              <ArrowRight size={18} />
            </a>
            <p className="text-white/30 text-xs mt-4">
              Free · No obligation · Contingency available
            </p>
          </div>
        </div>

        {/* ─── Disclaimer ─── */}
        <div className="p-5 rounded-xl bg-gray-100 border border-gray-200">
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            {analysis.disclaimer || 'This analysis is for informational purposes only and does not constitute legal advice. Results are estimates only. Legaliant is a brand of Vertex Ventures LLC. We are not a law firm.'}
          </p>
        </div>
      </div>
    </div>
  );
}
