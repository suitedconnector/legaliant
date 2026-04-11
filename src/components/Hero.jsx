import { Scale } from 'lucide-react';

export default function Hero({ compact = false }) {
  if (compact) {
    return (
      <header className="hero-bg border-b border-white/10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gold/20 flex items-center justify-center">
              <Scale size={14} className="text-gold" />
            </div>
            <span className="font-serif text-white font-bold tracking-wide text-lg">
              Legaliant
            </span>
          </div>
          <div className="ml-auto text-gold/60 text-xs font-medium tracking-widest uppercase">
            Case Assessment
          </div>
        </div>
        <div className="gold-rule" />
      </header>
    );
  }

  return (
    <header className="hero-bg relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(30%, -30%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(-30%, 30%)' }} />

      <div className="relative max-w-2xl mx-auto px-4 pt-10 pb-12">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center border border-gold/25">
            <Scale size={18} className="text-gold" />
          </div>
          <span className="font-serif text-white font-bold text-xl tracking-wide">
            Legaliant
          </span>
          <span className="ml-1 text-white/30 text-sm">by Vertex Ventures LLC</span>
        </div>

        {/* Main headline */}
        <div className="mb-3">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">
            California Wrongful Termination
          </p>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight mb-4">
            Know What Your<br />
            <span className="text-gold">Case Is Worth.</span>
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-md">
            Answer 4 quick questions. Get an AI-powered settlement estimate and
            personalized case analysis — free, in under 2 minutes.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-4 mt-8">
          {['California Employment Law', 'AI-Powered Analysis', 'Free & Confidential'].map(b => (
            <div key={b} className="flex items-center gap-1.5 text-white/50 text-xs">
              <div className="w-1 h-1 rounded-full bg-gold opacity-70" />
              {b}
            </div>
          ))}
        </div>
      </div>

      <div className="gold-rule" />
    </header>
  );
}
