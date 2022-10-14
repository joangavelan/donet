import { supabase } from '@/lib/supabase'

type SignUpProps = {
  email: string
  password: string
  fullName: string
}

export const signUp = async ({ fullName, email, password }: SignUpProps) => {
  const {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, signUp: true } }
  })
  if (error) throw error
  return user
}
