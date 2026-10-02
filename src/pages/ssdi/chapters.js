// Chapter list for the SSDI guide, in outline order.
// `title` is the page <h1> and link text; `description` is the page's meta description.
export const CHAPTERS = [
  {
    slug: 'laid-off-now-what',
    title: 'Laid Off? What to Do Now',
    description: 'First steps after a layoff when a health condition may keep you from working: deadlines, benefits, and where SSDI fits in.',
  },
  {
    slug: 'ai-layoffs-your-rights',
    title: 'AI Layoffs: Your Rights',
    description: 'What workers replaced or cut because of AI and automation should know about their rights, notice rules, and benefits.',
  },
  {
    slug: 'unemployment-sdi-ssdi',
    title: 'Unemployment, SDI, and SSDI',
    description: 'How unemployment insurance, California State Disability Insurance, and Social Security Disability differ and interact.',
  },
  {
    slug: 'do-you-qualify',
    title: 'Do You Qualify for SSDI?',
    description: 'The work-credit and medical requirements Social Security uses to decide who qualifies for disability benefits.',
  },
  {
    slug: 'ssdi-vs-ssi',
    title: 'SSDI vs. SSI',
    description: 'The difference between Social Security Disability Insurance and Supplemental Security Income, and which one applies to you.',
  },
  {
    slug: 'building-your-case',
    title: 'Building Your Case',
    description: 'Medical records, doctor statements, and work history: the evidence that makes an SSDI claim stronger.',
  },
  {
    slug: 'applying-step-by-step',
    title: 'Applying for SSDI, Step by Step',
    description: 'A step-by-step walkthrough of the SSDI application, from gathering documents to submitting your claim.',
  },
  {
    slug: 'denied-appeals',
    title: 'Denied? How Appeals Work',
    description: 'What to do after an SSDI denial: reconsideration, ALJ hearings, Appeals Council review, and federal court.',
  },
  {
    slug: 'waiting-period',
    title: 'The Waiting Period',
    description: 'How the SSDI five-month waiting period, back pay, and processing times work, and how to get by while you wait.',
  },
  {
    slug: 'choosing-help',
    title: 'Choosing Help',
    description: 'How to choose an SSDI attorney or representative, what they charge, and questions to ask before you hire one.',
  },
  {
    slug: 'checklists',
    title: 'Checklists',
    description: 'Printable checklists for applying for SSDI, preparing for appeals, and tracking your documents and deadlines.',
  },
]

export const GUIDE_TITLE = 'The SSDI Layoff Survival Guide'
export const SITE_NAME = 'Legaliant'

export function chapterBySlug(slug) {
  return CHAPTERS.find((c) => c.slug === slug)
}
