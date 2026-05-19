const STEPS = [
  { label: 'Your Situation', step: 1 },
  { label: 'Your Claims',    step: 2 },
  { label: 'Evidence',       step: 3 },
  { label: 'Unlock',         step: 4 },
];

const PROGRESS = { 1: 10, 2: 35, 3: 62, 4: 85 };

export default function ProgressBar({ step }) {
  const pct = PROGRESS[step] ?? 0;

  return (
    <div className="hero-bg border-b border-white/10">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1 sm:gap-2">
            {STEPS.map(({ label, step: s }, i) => {
              const isActive = step === s;
              const isDone   = step > s;
              return (
                <div key={s} className="flex items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <div className={[
                      'w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                      isDone    ? 'bg-gold text-navy'
                      : isActive ? 'bg-gold text-navy ring-2 ring-gold/30'
                                 : 'bg-white/10 text-white/30',
                    ].join(' ')}>
                      {isDone ? '✓' : i + 1}
                    </div>
                    <span className={[
                      'text-xs font-medium hidden sm:inline transition-colors duration-300',
                      isActive  ? 'text-white'
                      : isDone  ? 'text-gold/70'
                                : 'text-white/25',
                    ].join(' ')}>
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-4 sm:w-6 h-px bg-white/15 hidden sm:block" />
                  )}
                </div>
              );
            })}
          </div>
          <span className="text-white/40 text-xs ml-2 flex-shrink-0">
            Step {step} of 4
          </span>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}
