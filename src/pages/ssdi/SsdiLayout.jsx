import { useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { GUIDE_TITLE, SITE_NAME } from './chapters.js'

// Shared shell for /ssdi and its chapters: skip link, header/nav, main, footer.
export default function SsdiLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const firstRender = useRef(true)

  // Move focus to <main> after client-side navigation so keyboard and screen
  // reader users start at the new page's content. Skipped on first load, where
  // the browser's normal focus order already applies.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo(0, 0)
    mainRef.current?.focus()
  }, [pathname])

  return (
    <div className="ssdi-guide min-h-screen flex flex-col bg-white text-slate-900">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header className="bg-navy text-white">
        <div className="max-w-3xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <Link to="/ssdi" className="font-serif text-xl font-bold text-white no-underline">
            {GUIDE_TITLE}
          </Link>
          <nav aria-label="Site">
            <ul className="flex gap-5 list-none m-0 p-0 text-sm">
              <li>
                <Link to="/ssdi" className="text-white underline underline-offset-4">
                  Guide contents
                </Link>
              </li>
              <li>
                <Link to="/" className="text-white underline underline-offset-4">
                  Wrongful termination calculator
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1 w-full max-w-3xl mx-auto px-4 py-10 outline-none">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-slate-700">
          <p className="m-0">
            This guide is general information, not legal advice. © {new Date().getFullYear()} {SITE_NAME}.
          </p>
        </div>
      </footer>
    </div>
  )
}
