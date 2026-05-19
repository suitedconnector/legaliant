import Link from 'next/link';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { notFound } from 'next/navigation';

const POSTS = {
  'justice-direct-vs-legaliant': {
    title: 'Justice Direct vs Legaliant: Which Demand Letter Service Is Cheaper?',
    date: 'May 1, 2026',
    readTime: '4 min read',
    tag: 'Demand Letters',
    content: `
## The demand letter market has two main players — here's how they compare.

When you need to send a professional demand letter, you have two AI-powered options: Justice Direct and Legaliant. Both promise to generate a certified demand letter without requiring an attorney. But there are meaningful differences in price, AI quality, and the overall experience.

## Pricing

**Justice Direct** charges $29.50 for a certified mailing. That's their base price — no free download option is offered at the lower tier.

**Legaliant** charges $19.88 for the same certified mail service. A PDF download is always free — you only pay if you want us to physically mail the letter via USPS Certified Mail with Return Receipt.

**The difference: $9.62 savings per letter with Legaliant.**

## AI Quality

Justice Direct uses a form-based intake — you fill in fields, and a template populates. The result is serviceable but often generic.

Legaliant uses a conversational AI intake. You describe your situation in natural language, and the AI asks follow-up questions to extract the specific details that make a demand letter persuasive — deadlines, dollar amounts, prior communications, and the specific relief you're requesting.

The output is a letter that reads like it was written by a human attorney who understood your specific situation.

## Editing

With Justice Direct, edits require refilling the form and regenerating.

With Legaliant, you request edits in plain English after seeing your letter. Type "make the tone firmer" or "add a 14-day deadline" and the AI revises instantly — unlimited times, free.

## Verdict

For most disputes, Legaliant is the better choice: cheaper certified mail ($19.88 vs $29.50), free PDF download, smarter AI intake, and easier editing. Justice Direct has more brand recognition, but Legaliant delivers more value.
    `.trim(),
  },
  'how-to-write-a-demand-letter': {
    title: 'How to Write a Demand Letter That Actually Gets Results',
    date: 'April 22, 2026',
    readTime: '6 min read',
    tag: 'Demand Letters',
    content: `
## A demand letter is one of the most effective tools ordinary people have. Here's how to use it well.

A demand letter is a formal written notice asking someone to take specific action — pay you money, return your property, stop a behavior, or fix a problem. It's not a court filing. You don't need an attorney. You just need to get it right.

## The 5 elements of an effective demand letter

**1. State the facts clearly.** Describe what happened in chronological order. Include dates, dollar amounts, and specific events. No emotional language — just facts.

**2. Identify the legal basis.** You don't need to cite case law, but name the obligation that was violated. "Per our signed contract dated March 1..." or "Under California Labor Code §227.3..." This shows you know your rights.

**3. Specify the exact relief you want.** Don't say "make this right." Say "pay $4,200 within 14 days." Be specific about amount, deadline, and method.

**4. Set a firm deadline.** 7–30 days is standard. Shorter deadlines signal urgency. Include a consequence: "If I do not receive payment by [date], I will file in small claims court."

**5. Maintain a professional tone.** Angry letters get ignored. Professional letters get results. Save the emotions for conversations with your friends.

## When to use a demand letter

- Employer owes unpaid wages or final paycheck
- Landlord is withholding your security deposit
- Someone damaged your property and won't pay
- A contractor completed work poorly or not at all
- A business owes you a refund per their own policy

## Why AI-generated letters outperform DIY

Most people write demand letters that are too vague, too emotional, or missing key legal language. AI systems trained on legal documents know the right structure, the right tone, and the right phrases that signal to recipients you're serious.

The result: higher response rates, faster resolution, and letters that hold up if you do end up in court.
    `.trim(),
  },
  'do-you-need-an-attorney-for-demand-letter': {
    title: 'Do You Need an Attorney to Send a Demand Letter?',
    date: 'April 15, 2026',
    readTime: '5 min read',
    tag: 'Legal Basics',
    content: `
## The short answer: No. Here's the longer version.

Many people assume sending a demand letter requires hiring an attorney. This belief costs people time and money — and often stops them from pursuing legitimate claims entirely. Let's clear this up.

## Anyone can send a demand letter

A demand letter is not a court document. It's a private communication. There's no law — in any U.S. state — that requires you to use an attorney to write or send a demand letter. You can write it yourself, use an AI service, or hire an attorney if you choose.

## When you don't need an attorney

For the vast majority of common disputes, you don't need legal counsel:

- **Small claims court-bound disputes** ($10,000 or less in California): You'll represent yourself anyway.
- **Wage and labor claims**: California has clear statutes; a straightforward letter citing the relevant Labor Code section is sufficient.
- **Security deposit disputes**: A certified letter citing Civil Code §1950.5 often resolves these instantly.
- **Simple contract breaches**: If the facts are clear and the amount is defined, a demand letter is enough.

## When an attorney's letter does help

Attorney demand letters have some advantages in specific situations:

- **Complex business disputes** over large sums with murky liability
- **Pre-litigation strategy** where you need legal advice about your case
- **Letters to large corporations** with legal departments — their attorneys will treat a letter-from-attorney differently than a letter-from-individual

## The cost comparison

An attorney charges $200–$500+ to draft a demand letter, plus hourly time for consultations. For a $2,000 wage dispute, you'd spend 25–50% of your claim on the letter alone.

Legaliant generates the same quality letter in 5 minutes. Free to download. $19.88 if you want certified mail.

## The bottom line

Use an AI-powered demand letter service for standard disputes. Use an attorney when the stakes are high enough to justify the cost, or when you need strategic legal advice beyond a single letter.
    `.trim(),
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const post = POSTS[params.slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.content.split('\n\n')[0].replace(/^##\s*/, '').slice(0, 160),
  };
}

function renderContent(content) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## ')) {
      return (
        <h2 key={i} className="font-serif text-navy text-2xl font-bold mt-8 mb-3">
          {block.replace(/^## /, '')}
        </h2>
      );
    }
    if (block.startsWith('**') || block.includes('**')) {
      const parts = block.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="font-semibold text-navy">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return <p key={i} className="text-gray-600 leading-relaxed mb-4">{parts}</p>;
    }
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '));
      return (
        <ul key={i} className="space-y-2 mb-4 ml-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
              <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 mt-2" />
              <span dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
    }
    return <p key={i} className="text-gray-600 leading-relaxed mb-4">{block}</p>;
  });
}

export default function BlogPost({ params }) {
  const post = POSTS[params.slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="hero-bg py-10">
        <div className="max-w-3xl mx-auto px-4">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to guides
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-gold bg-gold/15 px-2.5 py-1 rounded-full">
              {post.tag}
            </span>
            <span className="text-xs text-white/40 flex items-center gap-1">
              <Clock size={11} /> {post.readTime}
            </span>
            <span className="text-xs text-white/40">{post.date}</span>
          </div>
          <h1 className="font-serif text-white text-3xl md:text-4xl font-bold leading-tight">
            {post.title}
          </h1>
        </div>
        <div className="gold-rule mt-8" />
      </section>

      <article className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
          {renderContent(post.content)}
        </div>

        <div className="mt-8 bg-navy rounded-2xl p-8 text-center shadow-navy-lg">
          <h3 className="font-serif text-white text-xl font-bold mb-2">
            Ready to write your demand letter?
          </h3>
          <p className="text-white/60 text-sm mb-5">
            Free to start. Download the PDF free. Mail certified for $19.88.
          </p>
          <Link href="/demand-letter/chat"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm">
            Write My Demand Letter <ArrowRight size={15} />
          </Link>
        </div>
      </article>
    </div>
  );
}
