import Link from 'next/link';
import { Scale, Calculator, FileText, BookOpen, ArrowRight, Shield } from 'lucide-react';

export const metadata = {
  title: 'The Law in Plain English — For Everyone',
  description: 'Free AI-powered legal tools: wrongful termination settlement calculators and demand letter generators. Built for people who need real help without expensive attorneys.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(-30%, 30%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 pt-16 pb-20 text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-5">
            Legal Tools for Real People
          </p>
          <h1 className="font-serif text-white text-5xl md:text-6xl font-bold leading-tight mb-6">
            The law. In plain English.<br />
            <span className="text-gold">For everyone.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            AI-powered legal tools that give you the knowledge and documents you need —
            without paying attorney rates for every question.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/demand-letter" className="btn-gold text-base px-8 py-4">
              Write a Demand Letter
              <ArrowRight size={18} />
            </Link>
            <Link href="/calculator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/20 hover:border-gold hover:text-gold transition-all duration-200">
              Calculate Case Value
            </Link>
          </div>
        </div>
        <div className="gold-rule" />
      </section>

      {/* Product cards */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="font-serif text-navy text-3xl font-bold text-center mb-3">
          What can we help you with?
        </h2>
        <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
          Professional-grade legal tools, free to use. No account required.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PRIMARY — Demand Letter */}
          <div className="md:col-span-1 bg-navy rounded-2xl overflow-hidden shadow-navy-lg flex flex-col">
            <div className="p-7 flex-1">
              <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #c9a84c, #d4b96a)' }}>
                <FileText size={22} className="text-navy" />
              </div>
              <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">Most Popular</div>
              <h3 className="font-serif text-white text-2xl font-bold mb-3">
                Demand Letter Generator
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Chat with our AI to build your case, then get a professionally written demand letter in minutes.
                Free to download. We mail it certified for $19.88.
              </p>
              <ul className="space-y-2 text-sm text-white/50">
                {['Any dispute type', 'Certified mail available', 'Less than Justice Direct'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-7">
              <Link href="/demand-letter"
                className="w-full btn-gold justify-center text-sm py-3 rounded-xl flex items-center gap-2">
                Write My Demand Letter
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex flex-col">
            <div className="p-7 flex-1">
              <div className="w-12 h-12 rounded-xl mb-5 bg-navy/8 flex items-center justify-center">
                <Calculator size={22} className="text-navy" />
              </div>
              <h3 className="font-serif text-navy text-xl font-bold mb-3">
                Case Value Calculator
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Estimate your California wrongful termination settlement value. AI-powered analysis
                based on your specific facts.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                {['Free & anonymous', 'Under 2 minutes', 'AI case analysis'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-7">
              <Link href="/calculator"
                className="w-full btn-navy justify-center text-sm py-3 rounded-xl flex items-center gap-2">
                Calculate My Case Value
              </Link>
            </div>
          </div>

          {/* Blog */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden flex flex-col">
            <div className="p-7 flex-1">
              <div className="w-12 h-12 rounded-xl mb-5 bg-navy/8 flex items-center justify-center">
                <BookOpen size={22} className="text-navy" />
              </div>
              <h3 className="font-serif text-navy text-xl font-bold mb-3">
                Free Legal Guides
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Plain-English guides on demand letters, wrongful termination, and how to protect
                your rights without expensive counsel.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                {['No jargon', 'California focused', 'Free forever'].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-7 pb-7">
              <Link href="/blog"
                className="w-full btn-outline justify-center text-sm py-3 rounded-xl flex items-center gap-2">
                Read the Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield size={18} className="text-gold" />
          <p className="font-serif text-navy text-xl font-semibold">
            Not a law firm. Built for people who need real help.
          </p>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto">
          Legaliant gives you the information and documents you need to act — without charging
          attorney rates for basic legal knowledge. Our tools help you understand your rights,
          draft documents, and know when you actually need a lawyer.
        </p>
      </section>
    </div>
  );
}
