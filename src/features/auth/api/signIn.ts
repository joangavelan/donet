import { supabase } from '@/lib/supabase'

type Credentials = {
  email: string
  password: string
}

export const signIn = async (credentials: Credentials) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signInWithPassword(credentials)

  if (error) throw error

  return user
}
