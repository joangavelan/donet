import { supabase } from '@/lib/supabase'

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}
