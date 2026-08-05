import { GitHubNotice } from "@/components/github-notice";
import { MarkdownContent } from "@/components/markdown";
import { getProfileReadme } from "@/lib/github";

export default async function Home() {
  const readme = await getProfileReadme();

  if (!readme.ok) {
    return (
      <GitHubNotice title="Não foi possível carregar o conteúdo" />
    );
  }

  return <MarkdownContent>{readme.data}</MarkdownContent>;
}
