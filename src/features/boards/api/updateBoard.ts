import { supabase } from '@/lib/supabase'
import type { Boards } from '@/types'

export const updateBoard = async (board: Boards['Update']) => {
  const { data: updatedBoard, error } = await supabase
    .from('boards')
    .update(board)
    .eq('id', board.id)
    .select()
    .single()

  if (error) throw error

  return updatedBoard
}
