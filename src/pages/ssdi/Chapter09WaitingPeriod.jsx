import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/waiting-period
export default function Chapter09WaitingPeriod() {
  return (
    <ChapterPage slug="waiting-period">
      <p className="text-lg leading-relaxed m-0 mb-6">
        Getting approved doesn't mean getting paid tomorrow. Two separate clocks are running.
      </p>

      <p className="m-0 mb-8">
        This is the part of SSDI that catches even approved applicants off guard. An approval letter
        feels like the finish line. It isn't quite — there are two built-in waiting periods, one for cash
        benefits and a longer one for Medicare.
      </p>

      <Pullquote
        speaker="Satya Nadella"
        role="CEO, Microsoft"
        source="internal memo, via Storyboard18"
        url="https://www.storyboard18.com/amp/brand-makers/satya-nadella-says-microsoft-layoffs-weighing-heavily-on-him-amid-ai-restructuring-76910.htm"
      >
        Before anything else, I want to speak to what's been weighing heavily on me, and what I know
        many of you are thinking about: the recent job eliminations.
      </Pullquote>
      <p className="m-0 mb-8">
        Waiting is its own kind of weight — whether it's a CEO sitting with a decision, or you sitting
        with a calendar, counting months until a benefit actually arrives.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        The five-month waiting period for cash benefits
      </h2>
      <p className="m-0 mb-4">
        SSDI has a built-in waiting period before your first payment. The SSA counts from the date it
        determines your disability began, and pays your first benefit for the <strong>sixth full
        month</strong> after that date.<sup>1</sup> In plain terms: five months of no SSDI payment,
        starting from your established onset date — not from your application date or approval date.
      </p>
      <p className="m-0 mb-8">
        There's one exception: if your disability is from ALS (amyotrophic lateral sclerosis) and you
        were approved on or after July 23, 2020, there's no waiting period at all.<sup>1</sup>
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Why back pay often softens this
      </h2>
      <p className="m-0 mb-8">
        Because the clock runs from your onset date — not your application date — approval often arrives
        well after that five-month window has already passed. When that happens, you're typically owed
        back pay covering the gap between when benefits should have started and when they actually get
        paid. This is part of why applying as soon as you know you're affected (Chapter 7) matters: an
        earlier, accurate onset date can mean more back pay, not less.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        The separate, longer wait for Medicare
      </h2>
      <p className="m-0 mb-4">
        Medicare eligibility runs on its own clock, and it's longer. Everyone approved for SSDI becomes
        eligible for Medicare only after a <strong>24-month</strong> qualifying period, counted from your
        first month of SSDI entitlement.<sup>2</sup> That's two full years — separate from, and longer
        than, the five-month cash-benefit wait.
      </p>
      <p className="m-0 mb-8">
        During those 24 months, you'll need another source of health coverage. Go back to Chapter 1's
        rundown of COBRA, Covered California, and Medi-Cal — that same decision tree applies here, just
        over a longer runway.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">What to do with this timeline</h2>
      <p className="m-0 mb-10">
        Write down two dates once you're approved: your established onset date (five months to first
        cash payment) and your first month of entitlement (24 months to Medicare). Both matter for
        planning, and neither is the date on your approval letter. The next chapter covers when it makes
        sense to bring in paid help to manage all of this.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/faqs/en/questions/KA-01777.html" className="underline underline-offset-4">
            Is there a waiting period for Social Security Disability Insurance (SSDI) benefits?
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/disabilityresearch/wi/medicare.htm" className="underline underline-offset-4">
            Medicare Information
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
