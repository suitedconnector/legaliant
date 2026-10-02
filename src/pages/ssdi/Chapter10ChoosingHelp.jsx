import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/choosing-help
export default function Chapter10ChoosingHelp() {
  return (
    <ChapterPage slug="choosing-help">
      <p className="text-lg leading-relaxed m-0 mb-6">
        You don't need a representative to apply for SSDI. Plenty of people decide they want one anyway.
      </p>

      <p className="m-0 mb-8">
        If you've made it through the earlier chapters — your own case, your own paperwork, maybe even
        your own denial and appeal — you already know how much this process asks of someone who's also
        managing a health condition. This chapter is about deciding whether to bring in help, and how to
        pick well if you do.
      </p>

      <Pullquote
        speaker="Marc Benioff"
        role="CEO, Salesforce"
        source="The Logan Bartlett Show, via Fox Business"
        url="https://www.foxbusiness.com/economy/salesforce-cuts-4000-jobs-due-ai-ceo-says"
      >
        I've reduced it from 9,000 heads to about 5,000, because I need less heads.
      </Pullquote>
      <p className="m-0 mb-8">
        Salesforce decided AI needed fewer people answering its customers. Your claim is the opposite
        situation: you get to decide whether a person — not software — should be answering for you.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Attorney or non-attorney representative?
      </h2>
      <p className="m-0 mb-8">
        You're allowed to appoint either. The SSA's own rule is simple: "attorneys must be licensed and
        all others must have good character and skills to help you."<sup>1</sup> Both types can represent
        you at every stage covered in Chapter 8, including hearings. Appointing someone is formal — you
        sign an Appointment of Representative form (SSA-1696), available directly from the SSA.
        <sup>1</sup>
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">How fees actually work</h2>
      <p className="m-0 mb-4">
        This surprises people: SSDI representatives are almost always paid on contingency, and the fee
        is capped by law, not negotiated case-by-case. Under the SSA's standard fee agreement process,
        a representative's fee is the <strong>lesser of 25% of your past-due benefits or $9,200</strong>{' '}
        (the cap in effect as of this writing).<sup>2,3</sup> The SSA itself withholds this amount from
        your back pay and pays the representative directly — you're not writing a separate check.
      </p>
      <p className="m-0 mb-8">
        Practically, this means: if you don't win back pay, a representative working under a standard
        fee agreement generally isn't paid. That's worth asking about directly before you sign anything —
        confirm the fee structure matches what the SSA allows, in writing.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Can't afford help, or not sure you need it?
      </h2>
      <p className="m-0 mb-8">
        If you've been denied and aren't sure where to turn, the SSA maintains referrals to legal aid and
        community organizations that may offer free help or help you find a representative.<sup>1</sup>{' '}
        You're never required to have a representative at any stage — some people handle the entire
        process, including a hearing, on their own.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">Questions worth asking before you hire anyone</h2>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-10">
        <li>Do you work on SSDI/SSI cases specifically, and how many have you handled?</li>
        <li>Is your fee the standard 25%/$9,200 cap, or something else — and why?</li>
        <li>Who will actually prepare my file and appear with me — you, or someone else at your firm?</li>
        <li>At what stage do you typically get involved — application, reconsideration, or hearing?</li>
      </ul>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/ssi/text-help-ussi.htm" className="underline underline-offset-4">
            Understanding SSI — How Someone Can Help You
          </a>
        </li>
        <li>
          Social Security Administration (POMS) —{' '}
          <a href="https://secure.ssa.gov/POMS.nsf/lnx/0203920035" className="underline underline-offset-4">
            GN 03920.035 — Fee Agreement Process
          </a>
        </li>
        <li>
          Federal Register —{' '}
          <a
            href="https://www.govinfo.gov/content/pkg/FR-2025-05-06/html/2025-07813.htm"
            className="underline underline-offset-4"
          >
            Maximum Dollar Amount in Fee Agreements ($9,200, effective November 30, 2024)
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
