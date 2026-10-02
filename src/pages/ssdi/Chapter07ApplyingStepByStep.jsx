import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/applying-step-by-step
export default function Chapter07ApplyingStepByStep() {
  return (
    <ChapterPage slug="applying-step-by-step">
      <p className="text-lg leading-relaxed m-0 mb-6">
        The application itself is the easy part. Here's exactly how it works.
      </p>

      <p className="m-0 mb-8">
        By now you've worked through whether SSDI or SSI fits (Chapter 5) and started gathering your
        file (Chapter 6). This chapter is just the mechanics: how to actually submit a claim.
      </p>

      <Pullquote
        speaker="Vishal Garg"
        role="CEO, Better.com"
        source="Zoom layoff call, via NBC News"
        url="https://www.nbcnews.com/news/us-news/bettercom-ceo-laid-900-workers-zoom-apologizes-current-staff-rcna8028"
      >
        If you're on this call, you are part of the unlucky group that is being laid off. Your
        employment here is terminated, effective immediately.
      </Pullquote>
      <p className="m-0 mb-8">
        That's how 900 people found out they'd lost their jobs — in a single call, with no process at
        all. The SSA's process is the opposite: slow, procedural, and document-heavy. Frustrating in the
        moment, but it's also why a complete, well-organized application matters so much.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">Three ways to apply</h2>
      <p className="m-0 mb-4">The SSA gives you three options<sup>1</sup>:</p>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>
          <strong>Online</strong> — through the SSA's own disability application, on your own schedule,
          from home.
        </li>
        <li>
          <strong>By phone</strong> — call <strong>1-800-772-1213</strong>, 7 a.m. to 7 p.m. Monday
          through Friday (TTY: 1-800-325-0778 if you're deaf or hard of hearing).
        </li>
        <li>
          <strong>In person</strong> — at a local Social Security office, by appointment.
        </li>
      </ul>
      <p className="m-0 mb-8">
        There's no "better" option here — pick whichever one you'll actually finish. Online tends to be
        fastest to start, but if your condition makes long forms exhausting, the phone or an in-person
        appointment lets someone else do the typing.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">What you'll be asked for</h2>
      <p className="m-0 mb-4">Have these ready, grouped the way the SSA asks for them<sup>1</sup>:</p>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>
          <strong>Personal data:</strong> birth information, Social Security number, marital history,
          your children's names and birth dates, and banking details for direct deposit.
        </li>
        <li>
          <strong>Medical information:</strong> your condition, every provider's contact info,
          medications, and test records — the list you started in Chapter 6.
        </li>
        <li>
          <strong>Work history:</strong> recent earnings, employer information, military service dates,
          and any workers' compensation or similar benefits you've received.
        </li>
      </ul>
      <p className="m-0 mb-8">
        Missing something on this list isn't a reason to wait. The SSA is explicit that you shouldn't
        delay applying because your paperwork isn't complete — they'll help you track down what's
        missing.<sup>1</sup>
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        What happens after you submit
      </h2>
      <p className="m-0 mb-4">
        Your claim goes to your state's disability determination office, where an examiner reviews your
        file against the test from Chapter 4. Officially, the SSA says an initial decision generally
        takes <strong>6 to 8 months</strong>.<sup>2</sup> How long yours actually takes depends on:
      </p>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>The nature of your condition and how it's evaluated</li>
        <li>How quickly your doctors respond to the SSA's requests for records</li>
        <li>Whether the SSA sends you for an additional medical exam (a "consultative exam")</li>
        <li>Whether your file is pulled for quality review</li>
      </ul>
      <p className="m-0 mb-8">
        You can create a <em>my Social Security</em> account online to check your claim's status rather
        than waiting on hold.<sup>2</sup>
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">While you wait</h2>
      <p className="m-0 mb-10">
        Six to eight months is a long time to have no income. The next chapter covers what happens if
        you're denied — which is common, and not the end of the road — and the chapter after that
        covers the separate five-month waiting period that applies even after you're approved.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/applyfordisability/index.htm" className="underline underline-offset-4">
            Apply Online for Disability Benefits
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a href="https://faq.ssa.gov/en-us/Topic/article/KA-01801" className="underline underline-offset-4">
            How long does it take to get a decision after I apply for disability benefits?
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
