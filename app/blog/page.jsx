import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';

export const metadata = {
  title: 'Free Legal Guides',
  description: 'Plain-English guides on demand letters, wrongful termination, and protecting your rights — written for people, not attorneys.',
};

const POSTS = [
  {
    slug: 'justice-direct-vs-legaliant',
    title: 'Justice Direct vs Legaliant: Which Demand Letter Service Is Cheaper?',
    excerpt: 'We break down the pricing, features, and AI quality of both services so you can decide which is right for your dispute.',
    date: 'May 1, 2026',
    readTime: '4 min read',
    tag: 'Demand Letters',
  },
  {
    slug: 'how-to-write-a-demand-letter',
    title: 'How to Write a Demand Letter That Actually Gets Results',
    excerpt: 'The key elements of an effective demand letter, what to include, what to avoid, and why AI-generated letters outperform most DIY attempts.',
    date: 'April 22, 2026',
    readTime: '6 min read',
    tag: 'Demand Letters',
  },
  {
    slug: 'do-you-need-an-attorney-for-demand-letter',
    title: 'Do You Need an Attorney to Send a Demand Letter?',
    excerpt: 'The short answer is no. Here\'s when a demand letter requires legal counsel, and when you\'re fine on your own — with the right tool.',
    date: 'April 15, 2026',
    readTime: '5 min read',
    tag: 'Legal Basics',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="hero-bg py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-gold text-xs font-semibold tracking-widest uppercase mb-3">Legal Guides</p>
          <h1 className="font-serif text-white text-4xl font-bold mb-3">Free Legal Guides</h1>
          <p className="text-white/60 text-base max-w-md mx-auto">
            Plain-English explanations of your rights. No jargon. No sales pitch.
          </p>
        </div>
        <div className="gold-rule mt-8" />
      </section>

      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="space-y-5">
          {POSTS.map(post => (
            <article key={post.slug}
              className="bg-white rounded-2xl border border-gray-100 shadow-card p-7 hover:shadow-card-hover transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                  {post.tag}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={11} /> {post.readTime}
                </span>
                <span className="text-xs text-gray-400">{post.date}</span>
              </div>
              <h2 className="font-serif text-navy text-xl font-bold mb-2 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-gold transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-gold text-sm font-medium hover:gap-2.5 transition-all duration-200">
                Read guide <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
