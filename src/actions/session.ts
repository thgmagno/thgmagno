'use server'

import { signIn } from '@/auth'

export async function signInWithGithub() {
  return signIn('github')
}
