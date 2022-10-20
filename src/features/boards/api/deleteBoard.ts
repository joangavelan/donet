import { supabase } from '@/lib/supabase'

export const deleteBoard = async (id: number | undefined) => {
  if (typeof id === 'undefined') throw new Error('Invalid action')
  const { error } = await supabase.from('boards').delete().eq('id', id)
  if (error) throw error
}
