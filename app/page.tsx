import { GitHubNotice } from "@/components/github-notice";
import { ReadmeContent } from "@/components/readme-content";
import { getProfile, getProfileReadme } from "@/lib/github";

export default async function Home() {
  const [profile, readme] = await Promise.all([
    getProfile(),
    getProfileReadme(),
  ]);

  if (!readme.ok) {
    return <GitHubNotice title="Não foi possível carregar o conteúdo" />;
  }

  return (
    <ReadmeContent
      markdown={readme.data}
      profile={profile.ok ? profile.data : null}
    />
  );
}
