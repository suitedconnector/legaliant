import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/building-your-case
export default function Chapter06BuildingYourCase() {
  return (
    <ChapterPage slug="building-your-case">
      <p className="text-lg leading-relaxed m-0 mb-6">
        SSDI isn't decided on how bad you feel. It's decided on paper. Here's what belongs in the file.
      </p>

      <p className="m-0 mb-8">
        The SSA doesn't interview you about your pain in person before deciding your claim. A claims
        examiner reads a file. If something isn't documented, it effectively didn't happen — however
        real it is to you. This chapter is about making sure your file tells the whole story.
      </p>

      <Pullquote
        speaker="Mark Zuckerberg"
        role="CEO, Meta"
        source="internal memo, via NBC News"
        url="https://www.nbcnews.com/business/business-news/meta-announces-5-percent-cuts-preparation-intense-year-internal-memo-rcna187657"
      >
        I've decided to raise the bar on performance management and move out low performers faster.
      </Pullquote>
      <p className="m-0 mb-8">
        A "performance" decision like that is built on documentation — reviews, metrics, a paper trail.
        Your SSDI claim works the same way in reverse: the file needs to show, on paper, exactly what
        you can no longer reliably do.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        The core question: your "residual functional capacity"
      </h2>
      <p className="m-0 mb-8">
        The SSA's central medical question has a name: your Residual Functional Capacity, or RFC —
        officially, "the most you can still do despite your limitations."<sup>1</sup> It covers physical
        abilities (sitting, standing, walking, lifting, carrying), mental abilities (understanding,
        remembering, following instructions, handling supervision), and anything else your condition
        affects. Every piece of evidence you gather should help answer one question: given everything
        wrong with you, what can you still actually do, for a full workday, five days a week?
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">What the SSA wants to see</h2>
      <p className="m-0 mb-4">Before you apply, the SSA recommends gathering:<sup>2</sup></p>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>
          <strong>Every treating provider's contact info</strong> — names, addresses, and phone numbers
          of everyone who has treated you, not just your primary specialist.
        </li>
        <li>
          <strong>A complete medication list</strong> — what you take and what it's for.
        </li>
        <li>
          <strong>Names and dates of medical tests</strong> — labs, imaging, evaluations — even ones you
          don't have copies of; the SSA can request records directly.
        </li>
        <li>
          <strong>A 15-year work history</strong> — every job, including self-employment, with dates,
          hours, and duties. This is what Part 2 of the disability test (Chapter 4) is built on.
        </li>
        <li>
          <strong>Two people who can speak to your condition</strong> — someone who has watched your
          limitations show up in daily life, not just a medical provider.
        </li>
      </ul>
      <p className="m-0 mb-8">
        The SSA is explicit on one point: don't delay applying because your file isn't complete.<sup>2</sup>{' '}
        They'll help track down records you don't have. Waiting to apply "until I have everything" is
        one of the most common — and costly — mistakes people make, because your filing date affects how
        far back benefits can reach.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Why consistency matters more than severity
      </h2>
      <p className="m-0 mb-8">
        A claims examiner isn't just looking for a scary diagnosis. They're looking for a <em>consistent</em>{' '}
        story across your medical records, your own statements, and what the people around you describe.
        If you tell your doctor your pain is a 9 out of 10 but your chart shows you skip follow-ups and
        your function report says you do yard work most weekends, that inconsistency — fair or not — hurts
        your case. Going to your appointments, reporting your symptoms honestly and consistently every
        time, and keeping your own notes on good days and bad days all build the record that eventually
        speaks for you.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">What this means this week</h2>
      <p className="m-0 mb-10">
        You don't need a lawyer to start building your file. You need a list of every provider you've
        seen, a medication list, and two people willing to describe what they've watched you struggle
        with. Start there. The next chapter walks through turning this into an actual application.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/OP_Home/cfr20/404/404-1545.htm" className="underline underline-offset-4">
            20 CFR § 404.1545 — Your Residual Functional Capacity
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a
            href="https://www.ssa.gov/disability/disability_starter_kits.htm"
            className="underline underline-offset-4"
          >
            Disability Starter Kits
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
