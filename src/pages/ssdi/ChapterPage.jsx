import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { CHAPTERS, GUIDE_TITLE, SITE_NAME, chapterBySlug } from './chapters.js'

// Body shared by every chapter route; each chapter file passes its slug and,
// once written, its content as children. Chapters with no children yet fall
// back to the "in progress" placeholder. Prev/next nav is derived from each
// chapter's position in CHAPTERS, so adding/reordering chapters there updates
// every chapter's links automatically.
export default function ChapterPage({ slug, children }) {
  const chapter = chapterBySlug(slug)
  const index = CHAPTERS.indexOf(chapter)
  const number = index + 1
  const prev = index > 0 ? CHAPTERS[index - 1] : null
  const next = index < CHAPTERS.length - 1 ? CHAPTERS[index + 1] : null

  return (
    <article>
      <Head>
        <title>{`${chapter.title} — ${GUIDE_TITLE} | ${SITE_NAME}`}</title>
        <meta name="description" content={chapter.description} />
      </Head>

      <p className="text-sm font-semibold uppercase tracking-wide text-slate-600 m-0 mb-2">
        Chapter {number}
      </p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy m-0 mb-6">{chapter.title}</h1>

      {children ?? (
        <p className="text-lg leading-relaxed m-0 mb-10">Content for this chapter is in progress.</p>
      )}

      <nav
        aria-label="Chapter navigation"
        className="mt-10 pt-6 border-t border-gray-200 flex items-start justify-between gap-4"
      >
        {prev ? (
          <Link
            to={`/ssdi/${prev.slug}`}
            className="text-blue-800 underline underline-offset-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            ← Chapter {index}: {prev.title}
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            to={`/ssdi/${next.slug}`}
            className="text-blue-800 underline underline-offset-4 font-semibold text-right focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
          >
            Chapter {number + 1}: {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <p className="mt-6">
        <Link to="/ssdi" className="text-blue-800 underline underline-offset-4 font-semibold">
          Back to guide
        </Link>
      </p>
    </article>
  )
}
