export interface ReadmeSection {
  /** Texto do `##`. */
  title: string;
  /** Markdown da seção, sem a linha do próprio título. */
  body: string;
}

export interface Readme {
  /** Texto do `#`, quando existe. */
  title: string | null;
  /** Markdown antes do primeiro `##`. */
  intro: string;
  sections: ReadmeSection[];
}

const H1 = /^#\s+(.+)$/;
const H2 = /^##\s+(.+)$/;
const FENCE = /^\s*(?:```|~~~)/;

/**
 * Quebra o README em seções pelos títulos de nível 2, para a página inicial
 * montar um card por seção em vez de um bloco corrido de Markdown.
 *
 * O corte é só na estrutura: o conteúdo de cada seção continua sendo Markdown
 * e segue renderizado como tal. Acrescentar um `##` no GitHub acrescenta um
 * card, sem mexer no código.
 */
export function parseReadme(markdown: string): Readme {
  const introLines: string[] = [];
  const sections: ReadmeSection[] = [];
  const bodyLines = new Map<ReadmeSection, string[]>();

  let title: string | null = null;
  let current: ReadmeSection | null = null;
  let insideFence = false;

  for (const line of markdown.split("\n")) {
    if (FENCE.test(line)) {
      insideFence = !insideFence;
    } else if (!insideFence) {
      // Um `#` ou `##` dentro de bloco de código é conteúdo, não título.
      const heading1 = line.match(H1);
      if (heading1 && title === null && current === null) {
        title = heading1[1].trim();
        continue;
      }

      const heading2 = line.match(H2);
      if (heading2) {
        current = { title: heading2[1].trim(), body: "" };
        sections.push(current);
        bodyLines.set(current, []);
        continue;
      }
    }

    (current ? bodyLines.get(current)! : introLines).push(line);
  }

  for (const section of sections) {
    section.body = bodyLines.get(section)!.join("\n").trim();
  }

  return {
    title,
    intro: introLines.join("\n").trim(),
    sections,
  };
}
