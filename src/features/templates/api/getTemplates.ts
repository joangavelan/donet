import { supabase } from '@/lib/supabase'

export const getTemplates = async (boardId: number) => {
  const { data: templates, error } = await supabase
    .from('templates')
    .select()
    .eq('board_id', boardId)

  if (error) throw error

  return templates
}
