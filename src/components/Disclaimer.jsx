import { Link } from 'react-router-dom';

export default function Disclaimer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-2xl mx-auto px-4 py-6">

        <p className="text-xs text-center mb-4">
          <Link
            to="/ssdi"
            className="text-blue-800 underline underline-offset-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Laid off and dealing with a health condition? Read our free SSDI guide
          </Link>
        </p>

        {/* Standard Disclaimer */}
        <p className="text-xs text-gray-400 leading-relaxed text-center mb-4">
          This calculator is for informational purposes only and does not constitute legal advice.
          Results are estimates only and are not a guarantee of any outcome. Individual case results
          vary based on specific facts and circumstances. Legaliant is a brand of Vertex Ventures LLC.
          We are not a law firm and do not provide legal representation.
        </p>
      </div>
    </footer>
  );
}
