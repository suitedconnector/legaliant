import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/do-you-qualify
export default function Chapter04DoYouQualify() {
  return (
    <ChapterPage slug="do-you-qualify">
      <p className="text-lg leading-relaxed m-0 mb-6">
        A layoff alone never qualifies you for SSDI. Here's what actually does.
      </p>

      <p className="m-0 mb-8">
        This is the chapter most people skip ahead to, so we'll get straight to it. Social Security
        uses a strict, three-part test. You have to meet all three — not two out of three.
      </p>

      <Pullquote
        speaker="Tobi Lütke"
        role="CEO, Shopify"
        source="internal memo, via TechCrunch"
        url="https://techcrunch.com/2025/04/07/shopify-ceo-tells-teams-to-consider-using-ai-before-growing-headcount"
      >
        Before asking for more headcount and resources, teams must demonstrate why they cannot get what
        they want done using AI.
      </Pullquote>
      <p className="m-0 mb-8">
        That's the same test, flipped around. If a CEO can tell a team "prove AI can't do this job"
        before approving a new hire, the SSA can ask you to prove the opposite — that no job, anywhere
        in the economy, fits what you can still do.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Part 1: You can't do substantial work
      </h2>
      <p className="m-0 mb-4">
        The SSA calls this "substantial gainful activity," or SGA. For 2026, that means earning more
        than <strong>$1,690 a month</strong> from work (a higher threshold applies if you're blind).
        <sup>1</sup> Earn above that from work and, generally, the SSA considers you capable of
        substantial activity — no matter how you feel day to day.
      </p>
      <p className="m-0 mb-8">
        This is also why "no benefits for partial or short-term disability" isn't a throwaway line.
        <sup>2</sup> There's no in-between tier here.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Part 2: You can't do your old job, or adjust to a new one
      </h2>
      <p className="m-0 mb-8">
        It's not enough that you can't do your specific previous job. The SSA also asks whether there's
        any other work — anywhere in the national economy — that your skills, education, and remaining
        physical or mental capacity would let you do.<sup>2</sup> This is the part that surprises
        people: age, education, and work history all factor into this analysis, not just your
        diagnosis.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Part 3: It has to last — or be expected to last — at least a year
      </h2>
      <p className="m-0 mb-8">
        Twelve consecutive months, minimum, or be expected to result in death.<sup>2</sup> A condition
        that's serious but likely to resolve in a few months typically points toward SDI (Chapter 3),
        not SSDI.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">The Listing of Impairments</h2>
      <p className="m-0 mb-8">
        The SSA maintains a detailed medical reference — sometimes called the "Blue Book" — describing
        specific conditions and the medical evidence needed to meet them automatically.<sup>3</sup> If
        your condition is listed and well-documented, your case can move faster. If it isn't listed, or
        doesn't meet the listing exactly, you can still qualify by showing your functional limitations
        another way — that's what Chapter 6 covers.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">And you still need work credits</h2>
      <p className="m-0 mb-10">
        Everything above is the medical side. You also need enough recent work history — generally 40
        credits, 20 of them earned in the last 10 years, with lower requirements if you're younger — as
        covered in Chapter 3. No work credits usually means SSI instead of SSDI, which the next chapter
        explains.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/oact/cola/sga.html" className="underline underline-offset-4">
            Substantial Gainful Activity
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a href="https://www.ssa.gov/benefits/disability/qualify.html" className="underline underline-offset-4">
            How Does Someone Become Eligible?
          </a>
        </li>
        <li>
          Social Security Administration —{' '}
          <a
            href="https://www.ssa.gov/disability/professionals/bluebook/listing-impairments.htm"
            className="underline underline-offset-4"
          >
            Listing of Impairments (Overview)
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
