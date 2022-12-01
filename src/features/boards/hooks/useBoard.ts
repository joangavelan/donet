import type { Boards } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

type Board = Boards['Row']

export const useBoard = () => {
  const { slug } = useParams()
  const boards = useQueryClient().getQueryData(['boards']) as Board[]
  const board = boards?.find((board) => board.slug === slug) as Board
  return board
}
