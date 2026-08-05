import { TriangleAlert, type LucideIcon } from "lucide-react";

interface GitHubNoticeProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

/** Estado vazio ou de falha ao ler dados do GitHub. */
export function GitHubNotice({
  title,
  description,
  icon: Icon = TriangleAlert,
}: GitHubNoticeProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed px-6 py-12 text-center">
      <Icon className="size-6 text-muted-foreground" aria-hidden />
      <p className="font-medium">{title}</p>
      {description && (
        <p className="max-w-prose text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
