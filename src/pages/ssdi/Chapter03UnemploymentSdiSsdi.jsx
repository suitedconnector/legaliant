import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/unemployment-sdi-ssdi
export default function Chapter03UnemploymentSdiSsdi() {
  return (
    <ChapterPage slug="unemployment-sdi-ssdi">
      <p className="text-lg leading-relaxed m-0 mb-6">
        Three programs, three different questions. Knowing which one fits saves you months.
      </p>

      <p className="m-0 mb-8">
        People mix these up constantly, and it's not their fault — the names are confusing and the
        agencies don't talk to each other. Here's what each one actually asks of you.
      </p>

      <Pullquote
        speaker="Sebastian Siemiatkowski"
        role="CEO, Klarna"
        source="PYMNTS"
        url="https://www.pymnts.com/artificial-intelligence-2/2025/klarna-ceo-ai-helped-drive-40percent-reduction-in-staff/"
      >
        The truth is, the company has shrunk from about 5,000 to now almost 3,000 employees.
      </Pullquote>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Unemployment Insurance (UI) — "I can work, but there's no job right now"
      </h2>
      <p className="m-0 mb-4">
        Run by California's EDD. Pays <strong>$40 to $450 a week</strong>, depending on your past
        earnings.<sup>1</sup> To qualify, you have to be "able and available" for work — not
        necessarily your old job, but some work you're reasonably suited for.<sup>2</sup> We could not
        confirm the maximum number of weeks on EDD's own pages; if that number matters to your
        planning, check your claim directly with EDD.
      </p>
      <p className="m-0 mb-8">
        <strong>This is the wrong program if:</strong> you genuinely cannot do any work right now
        because of your health. Certifying you're able and available when you're not can create
        problems for you later.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        State Disability Insurance (SDI) — "I can't work right now, but it's probably temporary"
      </h2>
      <p className="m-0 mb-4">
        Also run by EDD, and often confused with Social Security Disability because the names sound
        alike — they are completely separate programs. SDI pays <strong>70–90% of your wages</strong>{' '}
        (depending on income) for up to <strong>52 weeks</strong>, while a doctor certifies you can't
        do your regular work.<sup>3</sup>
      </p>
      <p className="m-0 mb-8">
        <strong>This is the wrong program if:</strong> your condition is expected to last a year or
        longer, or you're no longer employed long enough to have current SDI coverage through payroll
        deductions — eligibility there depends on your recent earnings, not your layoff status.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Social Security Disability Insurance (SSDI) — "I can't do any substantial work, long-term"
      </h2>
      <p className="m-0 mb-4">
        Run by the federal Social Security Administration, not EDD. This is the one most people in
        this guide are actually trying to reach. It requires a medical condition expected to prevent
        substantial work for at least 12 months (or result in death), plus enough work history.<sup>4</sup>{' '}
        The SSA generally wants 40 work credits, with 20 earned in the last 10 years before your
        disability began — fewer if you're younger.<sup>4</sup> No benefits are paid for partial or
        short-term disability.<sup>4</sup>
      </p>
      <p className="m-0 mb-8">
        We cover exactly how this is decided in the next chapter.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Can you file for more than one?
      </h2>
      <p className="m-0 mb-4">
        SDI and SSDI can genuinely work in sequence — SDI for the short term, SSDI if it turns out to
        be long-term. That transition is common and not contradictory.
      </p>
      <p className="m-0 mb-10">
        Unemployment and SSDI together is the pairing we flagged honestly in Chapter 1: UI requires
        you to say you can work, SSDI requires you to show you can't. We still haven't found an
        official SSA statement resolving that tension cleanly, so the same advice applies here — talk
        to an attorney or SSA before filing both.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          California EDD —{' '}
          <a href="https://edd.ca.gov/en/unemployment/" className="underline underline-offset-4">
            Unemployment Benefits
          </a>
        </li>
        <li>
          California EDD —{' '}
          <a href="https://edd.ca.gov/en/UIBDG/Able_and_Available_AA_235" className="underline underline-offset-4">
            Able and Available AA 235
          </a>
        </li>
        <li>
          California EDD —{' '}
          <a href="https://edd.ca.gov/en/disability/disability_insurance/" className="underline underline-offset-4">
            Disability Insurance Benefits
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/benefits/disability/qualify.html" className="underline underline-offset-4">
            How Does Someone Become Eligible?
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
