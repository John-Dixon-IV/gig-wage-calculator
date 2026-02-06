import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-zinc-50 mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl font-bold tracking-tight text-zinc-50 mb-4 mt-8">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl font-semibold text-zinc-100 mb-3 mt-6">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg text-zinc-300 leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-300 mb-4 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-zinc-300 mb-4 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-lg leading-relaxed">
        {children}
      </li>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber-500/50 pl-4 italic text-zinc-400 my-6">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-zinc-800/80 p-4 rounded-lg overflow-x-auto mb-4 ring-1 ring-zinc-700/50">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-zinc-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-zinc-200">
        {children}
      </em>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6 rounded-lg ring-1 ring-zinc-800/50">
        <table className="w-full text-sm text-left">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-800/80 text-xs uppercase tracking-wider text-zinc-400">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-800/50">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="bg-zinc-900/30 hover:bg-zinc-800/40 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 font-semibold text-zinc-300">{children}</th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-zinc-300">{children}</td>
    ),
    hr: () => (
      <hr className="border-zinc-700 my-8" />
    ),
    ...components,
  }
}
