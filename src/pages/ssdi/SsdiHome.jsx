import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { CHAPTERS, GUIDE_TITLE, SITE_NAME } from './chapters.js'

export default function SsdiHome() {
  return (
    <>
      <Head>
        <title>{`${GUIDE_TITLE}: Social Security Disability After a Layoff | ${SITE_NAME}`}</title>
        <meta
          name="description"
          content="A chapter-by-chapter guide to Social Security Disability (SSDI) after a layoff: eligibility, applying, appeals, and getting help."
        />
      </Head>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy m-0 mb-4">
        {GUIDE_TITLE}: Social Security Disability After a Layoff
      </h1>
      <p className="text-lg leading-relaxed m-0 mb-10">
        Lost your job and dealing with a health condition that keeps you from working? This guide walks
        through Social Security Disability, one chapter at a time.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-4">Chapters</h2>
      <ol className="space-y-3 pl-6 m-0">
        {CHAPTERS.map((c) => (
          <li key={c.slug} className="text-lg">
            <Link to={`/ssdi/${c.slug}`} className="text-blue-800 underline underline-offset-4">
              {c.title}
            </Link>
          </li>
        ))}
      </ol>
    </>
  )
}
