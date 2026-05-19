import Link from 'next/link';
import { ArrowRight, CheckCircle2, Mail, FileText, Download, Clock, MessageSquare, Star } from 'lucide-react';

export const metadata = {
  title: 'Free AI Demand Letter Generator',
  description: 'Write a professional demand letter in 5 minutes. Free to download. We mail it certified for $19.88 — less than Justice Direct.',
};

const DISPUTE_TYPES = [
  { icon: '🏢', label: 'Wrongful Termination' },
  { icon: '💰', label: 'Unpaid Wages' },
  { icon: '🏠', label: 'Landlord / Tenant' },
  { icon: '🚗', label: 'Auto / Property Damage' },
  { icon: '🛒', label: 'Consumer Dispute' },
  { icon: '📋', label: 'Breach of Contract' },
  { icon: '⚕️', label: 'Medical / Services' },
  { icon: '📦', label: 'Other Dispute' },
];

const STEPS_HOW = [
  {
    num: '01',
    title: 'Chat with our AI',
    desc: 'Answer a few questions about your dispute. The AI asks exactly what it needs to write a strong letter.',
  },
  {
    num: '02',
    title: 'Review your letter',
    desc: 'We generate a professional demand letter. Request any edits in plain English — the AI revises instantly.',
  },
  {
    num: '03',
    title: 'Download or mail',
    desc: 'Download the PDF free. Or let us print and mail it via USPS Certified Mail for $19.88.',
  },
];

export default function DemandLetterLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #c9a84c, transparent)', transform: 'translate(30%, -30%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 pt-14 pb-16 text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-4">
            AI Demand Letter Generator
          </p>
          <h1 className="font-serif text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
            Write a Professional Demand Letter<br />
            <span className="text-gold">in 5 Minutes — Free</span>
          </h1>
          <p className="text-white/65 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Our AI asks the right questions and writes a letter that gets results.
            Free to download. We mail it certified for $19.88 — less than the competition.
          </p>
          <Link href="/demand-letter/chat"
            className="btn-gold text-base px-10 py-4 rounded-xl inline-flex items-center gap-2 shadow-gold-lg">
            Write My Demand Letter
            <ArrowRight size={18} />
          </Link>
          <p className="text-white/30 text-xs mt-4">No account required · Free to start</p>
        </div>
        <div className="gold-rule" />
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <h2 className="font-serif text-navy text-3xl font-bold text-center mb-3">How it works</h2>
        <p className="text-gray-500 text-center mb-12">Three steps. Under 5 minutes.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS_HOW.map(step => (
            <div key={step.num} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-navy text-gold font-serif text-xl font-bold flex items-center justify-center mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="font-serif text-navy text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dispute types */}
      <section className="bg-white border-t border-b border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-navy text-2xl font-bold text-center mb-8">
            We cover all common dispute types
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DISPUTE_TYPES.map(dt => (
              <div key={dt.label}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:border-gold hover:bg-gold/5 transition-all duration-200">
                <span className="text-xl">{dt.icon}</span>
                <span className="text-navy text-sm font-medium">{dt.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="font-serif text-navy text-3xl font-bold text-center mb-3">
          Why Legaliant beats Justice Direct
        </h2>
        <p className="text-gray-500 text-center mb-10">
          Same certified mail delivery. Smarter AI. $9.62 less.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Competitors</p>
            <p className="font-serif text-gray-400 text-3xl font-bold mb-4">$29.50</p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gray-300" /> Certified mail</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gray-300" /> PDF download</li>
              <li className="flex items-center gap-2 line-through"><CheckCircle2 size={14} className="text-gray-200" /> AI chat intake</li>
              <li className="flex items-center gap-2 line-through"><CheckCircle2 size={14} className="text-gray-200" /> Plain-English edits</li>
            </ul>
          </div>

          <div className="bg-navy rounded-2xl shadow-navy-lg p-6 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <p className="text-gold/70 text-xs font-semibold uppercase tracking-widest mb-3">Legaliant</p>
            <p className="font-serif text-gold text-3xl font-bold mb-4">$19.88</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> Certified mail + tracking</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> PDF free download</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> AI chat intake</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-gold" /> Unlimited plain-English edits</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="font-serif text-navy text-3xl font-bold text-center mb-10">
          Frequently asked questions
        </h2>

        <div className="space-y-4">
          {[
            {
              q: 'What is a demand letter?',
              a: 'A demand letter is a formal written request asking someone to take a specific action — pay you money, fix a problem, or stop a behavior. It documents your position and creates a paper trail before legal action.',
            },
            {
              q: 'Is the demand letter legally valid?',
              a: 'Yes. Demand letters are not filed with any court — they are sent directly to the recipient. Our letters are professionally formatted, cite relevant law where applicable, and carry the same weight as any other demand letter.',
            },
            {
              q: 'Do I need an attorney to send a demand letter?',
              a: 'No. Anyone can send a demand letter. Attorneys charge $200–$500+ to draft one. Our AI does it in minutes for free. For complex litigation, consult an attorney — but for most disputes, a well-written demand letter resolves the issue.',
            },
            {
              q: 'What does certified mail include?',
              a: 'USPS Certified Mail with Return Receipt provides proof of mailing and proof of delivery — the recipient must sign for the letter. This creates a legal record that the letter was received, which is important if you later need to take further action.',
            },
            {
              q: 'Can I edit the letter after it is generated?',
              a: 'Yes. After the AI generates your letter, you can request any changes in plain English — just type what you want changed and the AI will revise it immediately. Revisions are free and unlimited.',
            },
          ].map((faq, i) => (
            <article key={i} className="bg-white rounded-xl border border-gray-100 shadow-card p-6">
              <h3 className="font-semibold text-navy mb-2">{faq.q}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <div className="bg-navy rounded-2xl p-10 shadow-navy-lg">
          <h2 className="font-serif text-white text-2xl font-bold mb-3">
            Ready to write your letter?
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Free to start. Download the PDF at no cost. Mail certified for $19.88.
          </p>
          <Link href="/demand-letter/chat"
            className="btn-gold text-base px-10 py-4 rounded-xl inline-flex items-center gap-2 shadow-gold-lg">
            Start Writing Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <p className="text-xs text-gray-400 text-center leading-relaxed">
          Legaliant is not a law firm and does not provide legal advice. Demand letters generated by our service
          are not reviewed by attorneys. For complex legal matters, consult a licensed attorney.
          Certified mail service provided via USPS. Legaliant is a brand of Vertex Ventures LLC.
        </p>
      </div>
    </div>
  );
}
