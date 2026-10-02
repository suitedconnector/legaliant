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
        Lost your job and dealing with a health condition that keeps you from working? This guide
        walks through Social Security Disability, one chapter at a time.
      </p>

      <section aria-label="Reader's story" className="mb-12 border-l-4 border-navy/20 pl-5">
        <p className="text-sm italic text-slate-600 m-0 mb-3">
          The following is a composite drawn from common situations described in layoff and
          disability-claim accounts. It is not a real individual.
        </p>
        <p className="m-0 mb-4">David didn't see it coming.</p>
        <p className="m-0 mb-4">
          Seventeen years at the same company. A good review in March. Then a Tuesday morning
          meeting, a Zoom link with too many names on it, and a sentence he'd remember for the rest
          of his life: "Your position has been eliminated, effective today."
        </p>
        <p className="m-0 mb-4">
          He had a bad back. Two surgeries in the last five years. He'd been managing it — modified
          duties, a standing desk, the occasional sick day. Managing it while employed.
        </p>
        <p className="m-0 mb-4">He had no idea what "managing it" would mean without a paycheck.</p>
        <p className="m-0 mb-4">
          David spent the first week angry. The second week scared. By the third week, he was
          searching online at midnight: "laid off can't work disability California."
        </p>
        <p className="m-0">That search is why this guide exists.</p>
      </section>

      <section aria-label="Introduction" className="mb-12">
        <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-4">Introduction</h2>
        <p className="m-0 mb-4">
          Whatever brought you here — a layoff last week, or a diagnosis that's made the job search
          harder than it should be — you're in the right place.
        </p>
        <p className="m-0 mb-4">
          Nobody plans to lose a job and a body at the same time. But if you're reading this, you may
          be facing both — a layoff, and a health condition that makes the next job harder to hold
          than the last one.
        </p>
        <p className="m-0 mb-4">
          This guide walks you through the two programs most people confuse: unemployment and Social
          Security Disability Insurance (SSDI). It also covers California's short-term State
          Disability Insurance (SDI) and Supplemental Security Income (SSI), because knowing which
          door to knock on first can save you months.
        </p>
        <p className="m-0">
          This is not legal advice, and it is not a substitute for a licensed attorney or the Social
          Security Administration. It is the map most people don't get until it's too late to use it
          well.
        </p>
      </section>

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
