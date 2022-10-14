import { supabase } from '@/lib/supabase'

type Credentials = {
  email: string
  password: string
}

export const signIn = async ({ email, password }: Credentials) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return user
}
