import ChapterPage from './ChapterPage.jsx'

// /ssdi/checklists
export default function Chapter11Checklists() {
  return (
    <ChapterPage slug="checklists">
      <p className="text-lg leading-relaxed m-0 mb-6">
        Ten chapters of detail, boiled down to four lists you can actually print and use.
      </p>

      <p className="m-0 mb-8">
        Nothing new here — every item ties back to a chapter you've already read, with the source there
        if you want to double-check it. Print this page or save it; it's meant to be marked up.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Checklist 1: The first 72 hours (Chapter 1)
      </h2>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>Don't sign any severance agreement yet — if you're 40+, you have at least 21 days to review it and 7 to revoke after signing.</li>
        <li>Confirm your final paycheck included all unused, accrued vacation.</li>
        <li>Write down dates, names, and exactly what was said in your termination meeting.</li>
        <li>Decide carefully whether to file for unemployment before or alongside an SSDI claim — talk to an attorney or SSA rep if you're unsure.</li>
        <li>Start your health-coverage decision: COBRA, Covered California, or Medi-Cal.</li>
      </ul>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Checklist 2: Before you apply for SSDI (Chapters 4, 6 &amp; 7)
      </h2>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>Confirm you likely meet all three SSA tests: can't do substantial work, can't do old or adjusted work, condition lasts 12+ months.</li>
        <li>List every treating provider's name, address, and phone number.</li>
        <li>List every current medication and what it treats.</li>
        <li>List names and dates of medical tests, even ones you don't have copies of.</li>
        <li>Write out your work history for the last 15 years, including self-employment.</li>
        <li>Identify two people who can describe your day-to-day limitations.</li>
        <li>Gather personal data: SSN, birth info, marital history, direct-deposit banking details.</li>
      </ul>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Checklist 3: If you're denied (Chapters 8 &amp; 9)
      </h2>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-8">
        <li>Mark the date on your denial notice — you have 60 days to request reconsideration (Form SSA-561).</li>
        <li>If denied again, you have 60 days from that notice to request a hearing before a judge.</li>
        <li>Still denied? 60 days to request Appeals Council review.</li>
        <li>Final denial? 60 days to file a civil action in federal court.</li>
        <li>Once approved, note your established onset date (starts the 5-month cash-benefit clock) and first month of entitlement (starts the 24-month Medicare clock) — neither is the date on your approval letter.</li>
      </ul>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Checklist 4: If you're choosing a representative (Chapter 10)
      </h2>
      <ul className="list-disc pl-6 space-y-2 m-0 mb-10">
        <li>Confirm whether they're an attorney or non-attorney representative — both are allowed.</li>
        <li>Confirm their fee follows the standard cap: the lesser of 25% of past-due benefits or $9,200.</li>
        <li>Ask how many SSDI/SSI cases they've handled.</li>
        <li>Ask who actually prepares your file and appears with you.</li>
        <li>Ask at what stage they typically get involved.</li>
        <li>If you can't afford help, ask the SSA for its legal-aid and community-organization referral list.</li>
      </ul>

      <p className="m-0 mb-10">
        That's the whole guide, compressed. If you only bookmark one page on this site, make it this one
        — and go back to the full chapter any time a line here needs more context.
      </p>
    </ChapterPage>
  )
}
