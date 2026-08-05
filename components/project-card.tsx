import { ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/github";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GithubIcon
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          {project.name}
        </CardTitle>
        <CardDescription>
          {project.description ?? "Sem descrição."}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-3">
        {project.topics.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.topics.map((topic) => (
              <li key={topic}>
                <Badge variant="secondary">{topic}</Badge>
              </li>
            ))}
          </ul>
        )}

        <dl className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {project.language && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Linguagem</dt>
              <dd>{project.language}</dd>
            </div>
          )}
          {project.stars > 0 && (
            <div className="flex items-center gap-1">
              <dt className="sr-only">Estrelas</dt>
              <dd className="flex items-center gap-1">
                <Star className="size-3" aria-hidden />
                {project.stars}
              </dd>
            </div>
          )}
          <div className="flex items-center gap-1">
            <dt className="sr-only">Última atualização</dt>
            <dd>
              <time dateTime={project.updatedAt}>
                {dateFormatter.format(new Date(project.updatedAt))}
              </time>
            </dd>
          </div>
        </dl>
      </CardContent>

      <CardFooter className="gap-2">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <GithubIcon aria-hidden />
          Código
        </a>
        {project.homepage && (
          <a
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "sm" }))}
          >
            <ExternalLink aria-hidden />
            Ver online
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
