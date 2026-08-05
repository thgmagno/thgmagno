import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

/**
 * Mapa de Markdown para JSX. O que não estiver aqui cai no `prose` do plugin
 * de tipografia, então tabelas, citações e afins continuam apresentáveis se
 * o README passar a usá-los.
 *
 * Os elementos remapeados usam `not-prose` para sair do escopo do plugin —
 * senão as margens e o marcador dele brigariam com o layout em card.
 */
const components: Components = {
  // configura link externo para abrir em uma nova aba
  a({ href, children, ...props }) {
    const isInternal = !href || href.startsWith("#") || href.startsWith("/");

    return (
      <a
        href={href}
        {...(isInternal
          ? {}
          : { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    );
  },

  // Subtítulo dentro de um card (ex.: "Frontend" dentro de "Stack").
  h3({ children }) {
    return (
      <h3 className="not-prose mt-4 mb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase first:mt-0">
        {children}
      </h3>
    );
  },

  ul({ children }) {
    return <ItemList>{children}</ItemList>;
  },

  ol({ children }) {
    return <ItemList ordered>{children}</ItemList>;
  },

  // Cada item vira uma linha com borda
  li({ children }) {
    return (
      <li className="not-prose rounded-lg bg-card px-3 py-2 text-sm ring-1 ring-foreground/10">
        {children}
      </li>
    );
  },
};

function ItemList({
  children,
  ordered,
}: {
  children: React.ReactNode;
  ordered?: boolean;
}) {
  const className = "not-prose grid list-none gap-2 p-0 text-left sm:grid-cols-2";

  return ordered ? (
    <ol className={className}>{children}</ol>
  ) : (
    <ul className={className}>{children}</ul>
  );
}

interface MarkdownContentProps {
  children: string;
  className?: string;
}

/**
 * Renderiza Markdown (GFM) vindo do GitHub. HTML embutido não é interpretado —
 * o `react-markdown` ignora tags cruas por padrão, o que mantém a renderização
 * segura mesmo que o README passe a conter HTML.
 */
export function MarkdownContent({ children, className }: MarkdownContentProps) {
  return (
    <div className={cn("prose prose-neutral max-w-none", className)}>
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </Markdown>
    </div>
  );
}
