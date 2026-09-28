import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { CHAPTERS, GUIDE_TITLE, SITE_NAME, chapterBySlug } from './chapters.js'

// Body shared by every chapter route; each chapter file passes its slug.
export default function ChapterPage({ slug }) {
  const chapter = chapterBySlug(slug)
  const number = CHAPTERS.indexOf(chapter) + 1

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
      <p className="text-lg leading-relaxed m-0 mb-10">Content for this chapter is in progress.</p>

      <p className="m-0">
        <Link to="/ssdi" className="text-blue-800 underline underline-offset-4 font-semibold">
          Back to guide
        </Link>
      </p>
    </article>
  )
}
