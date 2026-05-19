import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="hero-bg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center border border-gold/25">
            <Scale size={16} className="text-gold" />
          </div>
          <span className="font-serif text-white font-bold text-lg tracking-wide">
            Legaliant
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/calculator"
            className="text-white/60 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/demand-letter"
            className="text-white/60 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            Demand Letter
          </Link>
          <Link
            href="/blog"
            className="text-white/60 hover:text-white text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/demand-letter/chat"
            className="ml-2 btn-gold !px-5 !py-2 !text-sm !rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="gold-rule" />
    </nav>
  );
}
