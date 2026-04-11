export default function Disclaimer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <p className="text-xs text-gray-400 leading-relaxed text-center">
          This calculator is for informational purposes only and does not constitute legal advice.
          Results are estimates only and are not a guarantee of any outcome. Individual case results
          vary based on specific facts and circumstances. Legaliant is a brand of Vertex Ventures LLC.
          We are not a law firm and do not provide legal representation.{' '}
          <span className="text-gray-500">© {new Date().getFullYear()} Vertex Ventures LLC. All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
}
