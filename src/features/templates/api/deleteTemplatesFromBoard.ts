import { supabase } from '@/lib/supabase'

export const deleteTemplatesFromBoard = async (boardId: number) => {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('board_id', boardId)
  if (error) throw error
}
