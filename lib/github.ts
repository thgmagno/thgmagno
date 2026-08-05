import { cacheLife, cacheTag } from "next/cache";

/**
 * O GitHub é o painel que administra o portfólio:
 */
export const GITHUB_USER = "thgmagno";

/** Repositório */
export const PROFILE_REPO = "thgmagno";

/** Topic para mostrar um repositório no portfólio. */
export const PORTFOLIO_TOPIC = "portfolio";

/** Tag para usar cache nos dados do GitHub. */
export const GITHUB_CACHE_TAG = "github";

const API_BASE_URL = "https://api.github.com";

export interface Project {
  id: number;
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  updatedAt: string;
  isPrivate: boolean;
}

export interface Profile {
  login: string;
  name: string | null;
  avatarUrl: string;
}

/** Resultado de uma leitura do GitHub, para renderizar erro sem quebrar a página. */
export type GitHubResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string };

interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  pushed_at: string;
  archived: boolean;
  disabled: boolean;
  fork: boolean;
  private: boolean;
}

function buildHeaders(accept: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: accept,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": `${GITHUB_USER}-portfolio`,
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

async function requestGitHub(path: string, accept: string): Promise<Response> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: buildHeaders(accept),
  });

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const rateLimited = response.status === 403 && remaining === "0";

    throw new Error(
      rateLimited
        ? "Limite de requisições da API do GitHub atingido. Configure GITHUB_TOKEN para aumentar o limite."
        : `GitHub respondeu ${response.status} para ${path}.`,
    );
  }

  return response;
}

function toErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Não foi possível falar com a API do GitHub.";
}

/**
 * Largura pedida ao GitHub para o avatar.
 */
const AVATAR_SIZE = 320;

/**
 * Perfil público do GitHub
 */
export async function getProfile(): Promise<GitHubResult<Profile>> {
  "use cache";
  cacheTag(GITHUB_CACHE_TAG);

  try {
    const response = await requestGitHub(
      `/users/${GITHUB_USER}`,
      "application/vnd.github+json",
    );
    const user = (await response.json()) as GitHubUser;

    const avatarUrl = new URL(user.avatar_url);
    avatarUrl.search = `?s=${AVATAR_SIZE}`;

    cacheLife("hours");
    return {
      ok: true,
      data: {
        login: user.login,
        name: user.name,
        avatarUrl: avatarUrl.toString(),
      },
    };
  } catch (error) {
    cacheLife("minutes");
    return { ok: false, error: toErrorMessage(error) };
  }
}

/**
 * README do repositório de perfil, em Markdown puro.
 *
 * O `Accept: application/vnd.github.raw` faz a API devolver o arquivo já
 * decodificado, em vez do envelope JSON em base64.
 */
export async function getProfileReadme(): Promise<GitHubResult<string>> {
  "use cache";
  cacheTag(GITHUB_CACHE_TAG);

  try {
    const response = await requestGitHub(
      `/repos/${GITHUB_USER}/${PROFILE_REPO}/readme`,
      "application/vnd.github.raw",
    );
    const markdown = await response.text();

    cacheLife("hours");
    return { ok: true, data: markdown };
  } catch (error) {
    // Falha fica em cache por pouco tempo para o conteúdo voltar sozinho
    // assim que a API se recuperar.
    cacheLife("minutes");
    return { ok: false, error: toErrorMessage(error) };
  }
}

/**
 * Repositórios públicos marcados com o topic `portfolio`, dos mais recentes
 * para os mais antigos. Forks, arquivados e desativados ficam de fora.
 */
export async function getPortfolioProjects(): Promise<GitHubResult<Project[]>> {
  "use cache";
  cacheTag(GITHUB_CACHE_TAG);

  const path = process.env.GITHUB_TOKEN
    ? "/user/repos?per_page=100&sort=pushed&direction=desc&affiliation=owner&visibility=all"
    : `/users/${GITHUB_USER}/repos?per_page=100&sort=pushed&direction=desc`;

  try {
    const response = await requestGitHub(path, "application/vnd.github+json");
    const repos = (await response.json()) as GitHubRepo[];

    const projects = repos
      .filter(
        (repo) =>
          !repo.fork &&
          !repo.archived &&
          !repo.disabled &&
          repo.topics?.includes(PORTFOLIO_TOPIC),
      )
      .map<Project>((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage?.trim() ? repo.homepage.trim() : null,
        language: repo.language,
        topics: (repo.topics ?? []).filter(
          (topic) => topic !== PORTFOLIO_TOPIC,
        ),
        stars: repo.stargazers_count,
        updatedAt: repo.pushed_at,
        isPrivate: repo.private,
      }))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

    cacheLife("hours");
    return { ok: true, data: projects };
  } catch (error) {
    cacheLife("minutes");
    return { ok: false, error: toErrorMessage(error) };
  }
}