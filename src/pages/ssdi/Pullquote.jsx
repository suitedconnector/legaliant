// Reusable pullquote for a real, attributed statement about a company layoff —
// never a paraphrase or invented quote. `source` is the outlet, `url` its link.
export default function Pullquote({ children, speaker, role, source, url }) {
  return (
    <blockquote className="my-8 border-l-4 border-navy bg-slate-50 px-5 py-4">
      <p className="font-serif text-lg italic text-slate-800 m-0 mb-2">&ldquo;{children}&rdquo;</p>
      <footer className="text-sm text-slate-600">
        {speaker && <span>{speaker}</span>}
        {speaker && role && <span>, {role}</span>}
        {speaker && <span> — </span>}
        <cite className="not-italic">
          <a href={url} className="underline underline-offset-4 text-blue-800">
            {source}
          </a>
        </cite>
      </footer>
    </blockquote>
  )
}
