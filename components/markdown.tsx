import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

/**
 * Links do README apontam para fora do site (e-mail, WhatsApp, GitHub), então
 * qualquer coisa que não seja âncora interna abre em uma nova aba.
 */
const components: Components = {
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
};

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
    <div
      className={cn(
        "prose prose-neutral max-w-none",
        "text-center md:text-left",
        // Remove o marcador da lista abaixo de `md`
        "[&_ul]:list-none [&_ul]:ps-0",
        "[&_ol]:list-none [&_ol]:ps-0",
        className,
      )}
    >
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </Markdown>
    </div>
  );
}
