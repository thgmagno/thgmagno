import { FolderGit2 } from "lucide-react";
import { GitHubNotice } from "@/components/github-notice";
import { ProjectCard } from "@/components/project-card";
import { getPortfolioProjects, PORTFOLIO_TOPIC } from "@/lib/github";

export default async function ProjetosPage() {
  const projects = await getPortfolioProjects();

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-1">
        <h1 className="font-heading text-2xl font-bold">Projetos</h1>
      </header>

      {!projects.ok ? (
        <GitHubNotice
          title="Não foi possível carregar os projetos"
          description={projects.error}
        />
      ) : projects.data.length === 0 ? (
        <GitHubNotice
          icon={FolderGit2}
          title="Nenhum projeto por aqui ainda."
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.data.map((project) => (
            <li key={project.id} className="flex">
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
