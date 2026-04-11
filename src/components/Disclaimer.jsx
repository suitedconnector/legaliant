export default function Disclaimer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Terms of Use Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
          <p className="text-xs text-amber-800 leading-relaxed text-center font-semibold mb-2">
            LIMITED LICENSE: You may use this calculator for personal, non-commercial evaluation of your case only.
          </p>
          <p className="text-xs text-amber-700 leading-relaxed text-center">
            Copying, scraping, or replicating any part of the interface, outputs, or design for any purpose is strictly prohibited.
          </p>
        </div>

        {/* Standard Disclaimer */}
        <p className="text-xs text-gray-400 leading-relaxed text-center mb-4">
          This calculator is for informational purposes only and does not constitute legal advice.
          Results are estimates only and are not a guarantee of any outcome. Individual case results
          vary based on specific facts and circumstances. Legaliant is a brand of Vertex Ventures LLC.
          We are not a law firm and do not provide legal representation.
        </p>

        {/* Copyright Notice */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500 leading-relaxed text-center mb-2">
            <span className="font-semibold text-gray-500">© 2026 Vertex Ventures LLC. All rights reserved.</span>
          </p>
          <p className="text-xs text-gray-500 leading-relaxed text-center">
            The Legaliant Wrongful Termination Calculator, including its design, layout, damage breakdown format,
            visual styling, and unique report structure (e.g., settlement ranges, key factors list, FEHA next steps),
            is protected by U.S. copyright law. No reproduction, distribution, or creation of derivative works
            without express written permission.
          </p>
        </div>
      </div>
    </footer>
  );
}
