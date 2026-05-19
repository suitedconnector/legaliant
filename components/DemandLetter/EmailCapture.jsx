'use client';

import { useState } from 'react';

export default function EmailCapture({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    onSubmit(email);
  };

  return (
    <div className="mt-4 space-y-3">
      <p className="text-[#cbd5f0] text-sm leading-relaxed">
        We'll email you a copy of your letter so you never lose it —
        even if you close this tab.
      </p>
      <input
        type="email"
        value={email}
        onChange={e => { setEmail(e.target.value); setError(''); }}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder="your@email.com"
        autoFocus
        className="w-full rounded-xl px-4 py-3 text-white text-sm placeholder-[#4a5a80] outline-none transition-colors"
        style={{
          background: '#131f3a',
          border: '1px solid #2a3f6f',
        }}
        onFocus={e => (e.target.style.borderColor = '#c9a84c')}
        onBlur={e => (e.target.style.borderColor = '#2a3f6f')}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full font-semibold py-3.5 rounded-xl transition-all duration-200 text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: 'linear-gradient(to right, #c9a84c, #a8873d)',
          color: '#fff',
          boxShadow: '0 4px 14px rgba(201,168,76,0.2)',
        }}
      >
        {isLoading ? 'Sending…' : 'Save My Letter →'}
      </button>
      <p className="text-[#4a5a80] text-xs text-center">
        No spam. No pressure. Unsubscribe anytime.
      </p>
    </div>
  );
}
