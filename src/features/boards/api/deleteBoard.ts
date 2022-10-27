import { supabase } from '@/lib/supabase'

export const deleteBoard = async (boardId: number) => {
  const { error } = await supabase.from('boards').delete().eq('id', boardId)
  if (error) throw error
}
