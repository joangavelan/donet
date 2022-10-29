import { supabase } from '@/lib/supabase'

type NewUserData = {
  email: string
  password: string
  fullName: string
}

export const signUp = async ({ fullName, email, password }: NewUserData) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  })
  if (error) throw error
  return user
}
