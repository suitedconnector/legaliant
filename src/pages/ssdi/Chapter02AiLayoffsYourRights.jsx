import ChapterPage from './ChapterPage.jsx'
import Pullquote from './Pullquote.jsx'

// /ssdi/ai-layoffs-your-rights
export default function Chapter02AiLayoffsYourRights() {
  return (
    <ChapterPage slug="ai-layoffs-your-rights">
      <p className="text-lg leading-relaxed m-0 mb-6">
        Most layoffs are legal. Some aren't. The difference is worth five minutes of your time.
      </p>

      <p className="m-0 mb-8">
        Maybe your employer said it plainly: "your role was eliminated due to AI." Maybe they didn't
        say it at all, and you just noticed your team got smaller while the software got smarter. Either
        way, two separate questions matter here — whether you got the notice the law requires, and
        whether age played a role in who was chosen.
      </p>

      <Pullquote
        speaker="Matt Scherer"
        role="Senior Policy Counsel for Workers' Rights and Technology, Center for Democracy & Technology"
        source="Bloomberg Law"
        url="https://news.bloomberglaw.com/daily-labor-report/rising-ai-use-paired-with-layoffs-invites-age-bias-litigation"
      >
        There's an inherent assumption that older workers are going to be resistant to change, slower to
        take up and build on new technologies, and might not be beneficial to a company's long term
        growth as younger workers.
      </Pullquote>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Did you get 60 days' notice? (The Cal-WARN Act)
      </h2>
      <p className="m-0 mb-4">
        California's WARN Act requires covered employers to give <strong>60 days' advance written
        notice</strong> before a mass layoff, relocation, or termination — to affected employees and
        to the Employment Development Department.<sup>1</sup> If your employer broke this rule, you may
        be owed back pay and the value of lost benefits, up to 60 days' worth.<sup>1</sup>
      </p>
      <p className="m-0 mb-8">
        Not every employer is covered, and we're not going to hand you a specific employee-count number
        here that we couldn't confirm on the state's own page. If you got little or no warning before a
        layoff that affected a number of your coworkers at once, it's worth a free call to the
        California Labor Commissioner's Office (833-526-4636) or an employment attorney to find out
        whether your employer was covered and whether notice was owed.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">
        Were older workers targeted? (Age discrimination)
      </h2>
      <p className="m-0 mb-4">
        If you're 40 or older, California's Fair Employment and Housing Act protects you specifically
        in layoff decisions. Your age "must not be a factor" in who gets laid off, and an employer
        cannot use a workforce reduction — AI-driven or otherwise — as cover to quietly remove older,
        higher-paid workers while keeping younger ones.<sup>2</sup> The same rule applies to who gets
        called back after a layoff.<sup>3</sup>
      </p>
      <p className="m-0 mb-4">
        This protection also reaches a layoff that looks neutral on paper but lands disproportionately
        on older workers in practice — for example, a cut aimed at certain job titles or salary bands
        that happen to skew older. The employer has to show the policy was genuinely job-related, not
        just a reasonable-sounding story.<sup>3</sup>
      </p>
      <p className="m-0 mb-8">
        If you suspect age was a factor, you can file a complaint with California's Civil Rights
        Department within <strong>three years</strong> of the layoff.<sup>2</sup> You don't need a
        lawyer to file, though many people in this situation eventually want one — we'll cover how to
        choose one in a later chapter.
      </p>

      <h2 className="font-serif text-2xl font-bold text-navy m-0 mb-3">What this chapter isn't</h2>
      <p className="m-0 mb-10">
        This isn't a verdict on your specific layoff. It's a map of the two questions worth asking
        before you move on: was I owed notice, and was my age part of the decision. If the answer to
        either feels like "maybe," that's a reason to talk to someone qualified to look at your actual
        facts — not a reason to assume you have no case, and not a reason to assume you do.
      </p>

      <h2 className="font-serif text-xl font-bold text-navy m-0 mb-3">Sources</h2>
      <ol className="text-sm text-slate-700 space-y-1 pl-6 m-0">
        <li>
          California Dept. of Industrial Relations —{' '}
          <a href="https://www.dir.ca.gov/dlse/Cal-WARNAct.html" className="underline underline-offset-4">
            Cal-WARN Act
          </a>
        </li>
        <li>
          California Civil Rights Department —{' '}
          <a
            href="https://calcivilrights.ca.gov/wp-content/uploads/sites/32/2025/05/Age-Discrimination-in-Employment_ENG_2025.pdf"
            className="underline underline-offset-4"
          >
            California Law Protects Workers From Age Discrimination (fact sheet)
          </a>
        </li>
        <li>
          U.S. Equal Employment Opportunity Commission —{' '}
          <a href="https://www.eeoc.gov/prohibited-employment-policiespractices" className="underline underline-offset-4">
            Prohibited Employment Policies/Practices
          </a>
        </li>
      </ol>
    </ChapterPage>
  )
}
