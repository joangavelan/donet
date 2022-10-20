import { supabase } from '@/lib/supabase'
import type { Board } from '@/types'

type NewBoard = Omit<Board, 'id'>

export const createBoard = async (newBoard: NewBoard) => {
  const { data: board } = await supabase
    .from('boards')
    .select()
    .eq('slug', newBoard.slug)
    .single()

  if (board) throw new Error('The board already exists')

  const { data, error } = await supabase.from('boards').insert([newBoard])

  if (error) throw error

  return data
}
