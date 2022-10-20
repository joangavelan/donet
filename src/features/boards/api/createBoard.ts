import { supabase } from '@/lib/supabase'
import type { Board } from '@/types'

type NewBoard = Omit<Board, 'id'>

export const createBoard = async (newBoard: NewBoard) => {
  const { data: existingBoard } = await supabase
    .from('boards')
    .select()
    .eq('slug', newBoard.slug)
    .single()

  if (existingBoard) throw new Error('The board already exists')

  const { data: createdBoard, error } = await supabase
    .from('boards')
    .insert(newBoard)
    .select()
    .single()

  if (error) throw error

  return createdBoard
}
