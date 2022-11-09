import { supabase } from '@/lib/supabase'

export const getBoards = async () => {
  const { data: boards, error } = await supabase.from('boards').select()

  if (error) throw error

  return boards
}
