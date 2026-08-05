import { GitHubNotice } from "@/components/github-notice";
import { MarkdownContent } from "@/components/markdown";
import { ProfileAvatar } from "@/components/profile-avatar";
import { getProfile, getProfileReadme } from "@/lib/github";

export default async function Home() {
  const [profile, readme] = await Promise.all([
    getProfile(),
    getProfileReadme(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* A foto some sozinha se a API falhar */}
      {profile.ok && <ProfileAvatar profile={profile.data} />}

      {readme.ok ? (
        <MarkdownContent>{readme.data}</MarkdownContent>
      ) : (
        <GitHubNotice title="Não foi possível carregar o conteúdo" />
      )}
    </div>
  );
}
