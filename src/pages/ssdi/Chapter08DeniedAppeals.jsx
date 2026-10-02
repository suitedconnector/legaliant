import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/denied-appeals
export default function Chapter08DeniedAppeals() {
  return (
    <ChapterPage slug="denied-appeals">
      <p className="text-lg leading-relaxed m-0 mb-6">
        A denial letter feels final. It isn't. Here's the four-step ladder the SSA gives you.
      </p>

      <p className="m-0 mb-8">
        A denial isn't a verdict on whether you're actually disabled — it's often a sign the file didn't
        yet tell the full story. The SSA built an entire appeals process for exactly this, with four
        levels.<sup>1</sup> Every level has the same deadline attached to it, so the number to remember is{' '}
        <strong>60</strong>.
      </p>

      <Pullquote
        speaker="Jack Dorsey"
        role="CEO, Block"
        source="internal memo, via Fast Company"
        url="https://fastcompany.com/91500048/in-a-626-word-x-post-jack-dorsey-justifies-his-decision-to-lay-off-40-of-blocks-workforce"
      >
        I accept that we may have gotten some of them wrong, and we've built in flexibility to account
        for that, and do the right thing for our customers.
      </Pullquote>
      <p className="m-0 mb-8">
        Even a company laying off 40% of its workforce admits the first pass gets some decisions wrong —
        and builds in a way to fix them. The SSA's appeals process is that same acknowledgment, formalized
        into four levels. A denial is a first pass, not a final word.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Level 1: Reconsideration
      </h2>
      <p className="m-0 mb-8">
        You have <strong>60 days</strong> from the date you receive your denial notice to request an
        appeal in writing — online, by mail, or by fax using Form SSA-561.<sup>1</sup> A different
        reviewer, who wasn't involved in the first decision, looks at your file again, including any new
        evidence you add. This is the moment to go back to Chapter 6 and fill any gaps in your medical
        record that the denial letter points to.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Level 2: Hearing before an administrative law judge
      </h2>
      <p className="m-0 mb-8">
        Still denied? You have <strong>60 days</strong> from the reconsideration notice to request a
        hearing.<sup>1</sup> This time, a judge who hasn't seen your case before reviews it fresh — in
        person, by agency video, online video, or by phone. The judge may call in medical or vocational
        experts to testify. For many people, this is the level where a case finally gets approved,
        because it's the first time someone hears the full picture directly rather than through a file
        alone.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Level 3: Appeals Council
      </h2>
      <p className="m-0 mb-8">
        If the judge rules against you, you have <strong>60 days</strong> from that decision to ask the
        Appeals Council to review it.<sup>1</sup> The Council can grant your request and decide the case
        itself, deny the request (leaving the judge's decision as final), or send the case back to a
        judge for another look.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Level 4: Federal court
      </h2>
      <p className="m-0 mb-10">
        The last stop is a civil action in U.S. District Court, which you have <strong>60 days</strong>{' '}
        from the Appeals Council's decision to file.<sup>1</sup> At this stage you're arguing that the
        SSA made a legal error, not re-litigating the medical facts from scratch — which is why most
        people bring an attorney in well before this point. The next chapter covers what the waiting
        period looks like once you're actually approved, and the one after that covers how to choose
        help for exactly these later stages.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/ssi/text-appeals-ussi.htm" className="underline underline-offset-4">
            Understanding Supplemental Security Income — The Appeals Process
          </a>{' '}
          (the four appeal levels and deadlines described apply to disability determinations generally,
          including SSDI)
        </li>
      </ol>
    </ChapterPage>
  )
}
