import { MarkdownContent } from "@/components/markdown";
import { ProfileAvatar } from "@/components/profile-avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { parseReadme } from "@/lib/readme";
import type { Profile } from "@/lib/github";

interface ReadmeContentProps {
  markdown: string;
  profile: Profile | null;
}

/**
 * Página inicial montada a partir do README: o topo (foto, nome e texto de
 * abertura) vira uma apresentação, e cada `##` vira um card.
 */
export function ReadmeContent({ markdown, profile }: ReadmeContentProps) {
  const { title, intro, sections } = parseReadme(markdown);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 text-center items-center py-12">
        {profile && <ProfileAvatar profile={profile} />}

        {title && (
          <h1 className="font-heading text-3xl font-bold">{title}</h1>
        )}

        {intro && (
          <MarkdownContent className="max-w-2xl">
            {intro}
          </MarkdownContent>
        )}
      </header>

      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle className="text-lg">{section.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownContent>{section.body}</MarkdownContent>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
