import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-8">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-navy/8 flex items-center justify-center">
              <Scale size={14} className="text-navy" />
            </div>
            <span className="font-serif text-navy font-bold tracking-wide">Legaliant</span>
            <span className="text-gray-400 text-xs">by Vertex Ventures LLC</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link href="/calculator" className="hover:text-navy transition-colors">Calculator</Link>
            <Link href="/demand-letter" className="hover:text-navy transition-colors">Demand Letter</Link>
            <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
            <Link href="/privacy" className="hover:text-navy transition-colors">Privacy</Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed text-center">
          This website is for informational purposes only and does not constitute legal advice.
          Results are estimates only and are not a guarantee of any outcome. Individual case results
          vary based on specific facts and circumstances. Legaliant is a brand of Vertex Ventures LLC.
          We are not a law firm and do not provide legal representation.
        </p>
        <p className="text-xs text-gray-300 text-center mt-3">
          © 2026 Vertex Ventures LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
