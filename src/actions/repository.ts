'use server'

import { GithubResponse } from '@/lib/types'
import { env } from 'root/env'

export async function fetcherRepositories(): Promise<GithubResponse> {
  return await fetch(
    `https://api.github.com/search/repositories?q=user:${env.GITHUB_USER}+topic:portfolio+fork:true`,
    {
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      },
      next: {
        revalidate: 600,
      },
    },
  ).then((res) => res.json())
}
