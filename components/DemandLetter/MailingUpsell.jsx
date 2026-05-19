'use client';

import { useState } from 'react';
import { Mail, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MailingUpsell({ letter, recipientAddress, senderEmail, senderName }) {
  const [tier, setTier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    if (!tier) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/mail-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, letter, recipientAddress, senderEmail, senderName }),
      });
      if (!res.ok) throw new Error('Order failed');
      setOrdered(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (ordered) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 text-center step-enter-up">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
          <CheckCircle2 size={28} className="text-white" />
        </div>
        <h3 className="font-serif text-navy text-xl font-bold mb-2">Order received!</h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
          Your demand letter will be printed and mailed via USPS Certified Mail.
          Check your email for a confirmation with tracking details.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
        <h3 className="font-serif text-navy text-lg font-bold mb-1">How would you like to send it?</h3>
        <p className="text-gray-500 text-sm mb-5">
          Choose your mailing option or download the PDF for free.
        </p>

        <div className="space-y-3">
          {/* Standard */}
          <label
            className={[
              'flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-150',
              tier === 'standard' ? 'border-navy bg-navy/3' : 'border-gray-200 hover:border-navy/30',
            ].join(' ')}
          >
            <input
              type="radio"
              className="hidden"
              name="tier"
              value="standard"
              checked={tier === 'standard'}
              onChange={() => setTier('standard')}
            />
            <div className={[
              'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
              tier === 'standard' ? 'border-navy' : 'border-gray-300',
            ].join(' ')}>
              {tier === 'standard' && <div className="w-2.5 h-2.5 rounded-full bg-navy" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-navy" />
                  <span className="font-semibold text-navy">Standard Certified Mail</span>
                </div>
                <span className="font-bold text-navy text-lg">$19.88</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                USPS Certified Mail with Return Receipt · Delivered within 2 business days
              </p>
            </div>
          </label>

          {/* Urgent */}
          <label
            className={[
              'flex items-start gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-150 relative',
              tier === 'urgent' ? 'border-navy bg-navy/3' : 'border-gray-200 hover:border-navy/30',
            ].join(' ')}
          >
            <div className="absolute -top-3 right-4 bg-gold text-navy text-xs font-bold px-2.5 py-0.5 rounded-full">
              FASTEST
            </div>
            <input
              type="radio"
              className="hidden"
              name="tier"
              value="urgent"
              checked={tier === 'urgent'}
              onChange={() => setTier('urgent')}
            />
            <div className={[
              'w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center',
              tier === 'urgent' ? 'border-navy' : 'border-gray-300',
            ].join(' ')}>
              {tier === 'urgent' && <div className="w-2.5 h-2.5 rounded-full bg-navy" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-navy" />
                  <span className="font-semibold text-navy">Same-Day Urgent Mail</span>
                </div>
                <span className="font-bold text-navy text-lg">$29.88</span>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Mailed same day if ordered before noon PT · Includes priority tracking
              </p>
            </div>
          </label>
        </div>

        {tier && (
          <div className="mt-4 step-enter-up">
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full btn-gold py-4 text-base justify-center rounded-xl"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" /> Processing…</>
              ) : (
                <>Mail My Letter <ArrowRight size={16} /></>
              )}
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">
              Includes tracking number · Proof of delivery · Not attorney service
            </p>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center leading-relaxed">
        Certified mail includes USPS tracking + proof of delivery.
        Legaliant is a brand of Vertex Ventures LLC. Not attorney service.
      </p>
    </div>
  );
}
