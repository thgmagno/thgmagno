'use server'

import { signIn } from '@/auth'
import { redirect } from 'next/navigation'

export async function signInWithGithub() {
  await signIn('github')
  redirect('/admin')
}
