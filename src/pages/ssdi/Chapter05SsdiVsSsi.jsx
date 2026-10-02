import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/ssdi-vs-ssi
export default function Chapter05SsdiVsSsi() {
  return (
    <ChapterPage slug="ssdi-vs-ssi">
      <p className="text-lg leading-relaxed m-0 mb-6">
        Same medical test. Completely different financial test. Here's the split.
      </p>

      <p className="m-0 mb-8">
        SSDI and SSI are easy to confuse because the Social Security Administration runs both, and the
        medical bar is similar. The difference that actually matters for most people in this guide is
        money — specifically, how much you have and how you got here.
      </p>

      <Pullquote
        speaker="Sundar Pichai"
        role="CEO, Google"
        source="internal memo, via NBC Bay Area"
        url="https://www.nbcbayarea.com/news/business/money-report/google-to-lay-off-12000-people-read-the-memo-ceo-sundar-pichai-sent-to-staff/3134752/"
      >
        We'll also offer a severance package starting at 16 weeks salary plus two weeks for every
        additional year at Google.
      </Pullquote>
      <p className="m-0 mb-8">
        Notice what that severance formula does: it pays out based on years worked. SSDI runs on the
        same logic — benefits earned through your work history, not your current bank balance. SSI is
        the opposite — no work history required, but your current resources matter a great deal.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">SSDI: earned through work</h2>
      <p className="m-0 mb-8">
        SSDI is insurance you paid into through payroll taxes. That's why it requires work credits
        (Chapter 3) — generally 40, with 20 earned in the last 10 years. There's no income or asset
        limit to qualify; what matters is your work history and your medical condition.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">SSI: based on financial need</h2>
      <p className="m-0 mb-4">
        SSI doesn't require any work history at all.<sup>1</sup> Instead, it's needs-based: in 2026,
        you generally can't earn more than <strong>$2,073 a month</strong> from work, and you can't
        have more than <strong>$2,000 in resources</strong> — things like bank accounts and vehicles
        beyond what's exempt.<sup>1</sup> The maximum federal payment in 2026 is{' '}
        <strong>$994 a month for an individual</strong>, or $1,491 with an eligible spouse.<sup>2</sup>
      </p>
      <p className="m-0 mb-8">
        The medical side of SSI uses the same substantial-gainful-activity threshold and the same
        Listing of Impairments as SSDI.<sup>3</sup> If you clear the medical bar for one, you've
        generally cleared it for the other — the question is which financial test you fit.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Which one applies to you?
      </h2>
      <p className="m-0 mb-4">
        <strong>Enough recent work history, regardless of current savings:</strong> SSDI is your path.
      </p>
      <p className="m-0 mb-4">
        <strong>Little or no recent work history, and limited income and resources:</strong> SSI is
        your path.
      </p>
      <p className="m-0 mb-10">
        <strong>Somewhere in between — some work credits, but not enough, and limited resources:</strong>{' '}
        you may qualify for both at once, with SSI filling the gap below SSDI's payment amount. This is
        common enough that the SSA has a name for it — "concurrent" benefits — but the details depend
        on your specific numbers, which is a conversation for Chapter 10.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/ssi/eligibility" className="underline underline-offset-4">
            Who Can Get SSI
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/oact/cola/SSI.html" className="underline underline-offset-4">
            SSI Federal Payment Amounts for 2026
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/ssi/text-disable-ussi.htm" className="underline underline-offset-4">
            Understanding SSI — If You Are Disabled or Blind
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
