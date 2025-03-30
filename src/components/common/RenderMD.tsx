import ReactMarkdown from 'react-markdown'

export function RenderMD({ md }: { md: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="mb-4 text-3xl font-bold">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="mb-3 text-2xl font-semibold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="mb-2 text-xl font-medium">{children}</h3>
        ),
        p: ({ children }) => <p className="mb-4 text-base">{children}</p>,
        ul: ({ children }) => (
          <ul className="mb-4 list-inside list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-4 list-inside list-decimal">{children}</ol>
        ),
        li: ({ children }) => <li className="ml-4">{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-gray-400 pl-4 italic">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="rounded bg-gray-700 p-1 text-white">{children}</code>
        ),
        pre: ({ children }) => (
          <pre className="overflow-x-auto rounded bg-gray-900 p-4 text-white">
            {children}
          </pre>
        ),

        a: ({ children, href }) => (
          <a href={href} className="text-blue-500 hover:underline">
            {children}
          </a>
        ),
      }}
      // rehypePlugins={[rehypeHighlight]}
    >
      {md}
    </ReactMarkdown>
  )
}
