export const metadata = {
  title: 'Privacy Policy',
  description: 'Legaliant Privacy Policy — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="hero-bg py-10">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Legal</p>
          <h1 className="font-serif text-white text-4xl font-bold">Privacy Policy</h1>
          <p className="text-white/50 text-sm mt-2">Last updated: May 18, 2026</p>
        </div>
        <div className="gold-rule mt-8" />
      </section>

      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8 prose prose-sm max-w-none">
          <h2 className="font-serif text-navy text-2xl font-bold mb-4">1. Who we are</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Legaliant is a brand of Vertex Ventures LLC (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
            We operate legaliant.com, including the wrongful termination settlement calculator and
            the AI demand letter generator. We are not a law firm and do not provide legal advice.
          </p>

          <h2 className="font-serif text-navy text-2xl font-bold mb-4">2. Information we collect</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            <strong className="text-navy">Calculator tool:</strong> When you use our wrongful termination
            calculator, we collect the information you provide: salary, employment history, termination
            date, claim types, and evidence factors. If you unlock your analysis, we also collect your
            name, email, and optionally your phone number.
          </p>
          <p className="text-gray-600 leading-relaxed mb-3">
            <strong className="text-navy">Demand letter tool:</strong> We collect the details you provide
            during the chat intake (dispute type, facts, amounts, parties) and, for mailing orders,
            your email address, sender name, and recipient mailing address.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            <strong className="text-navy">Usage data:</strong> Like most websites, we collect standard
            server logs including IP address, browser type, and pages visited.
          </p>

          <h2 className="font-serif text-navy text-2xl font-bold mb-4">3. How we use your information</h2>
          <ul className="text-gray-600 leading-relaxed mb-6 space-y-2">
            <li>To generate your case analysis or demand letter</li>
            <li>To email your results (calculator) or order confirmation (mailing service)</li>
            <li>To connect you with attorneys in our network if you request a case review</li>
            <li>To improve our AI models and user experience</li>
          </ul>

          <h2 className="font-serif text-navy text-2xl font-bold mb-4">4. TCPA consent</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            If you check the consent box on the calculator, you expressly consent to be contacted by
            Legaliant and licensed California employment attorneys in our network via phone, text, and
            email regarding your legal matter. You may opt out of texts at any time by replying STOP.
          </p>

          <h2 className="font-serif text-navy text-2xl font-bold mb-4">5. Data sharing</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We do not sell your personal information. We may share your information with attorneys in
            our network if you consent, with service providers who process data on our behalf (Resend
            for email, Anthropic for AI processing), and as required by law.
          </p>

          <h2 className="font-serif text-navy text-2xl font-bold mb-4">6. Data retention</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            We retain your information for as long as necessary to provide our services and comply with
            legal obligations. You may request deletion of your data by emailing privacy@legaliant.com.
          </p>

          <h2 className="font-serif text-navy text-2xl font-bold mb-4">7. Contact</h2>
          <p className="text-gray-600 leading-relaxed">
            Questions about this policy? Email us at{' '}
            <a href="mailto:privacy@legaliant.com" className="text-gold underline">privacy@legaliant.com</a>.
            Vertex Ventures LLC, California.
          </p>
        </div>
      </article>
    </div>
  );
}
