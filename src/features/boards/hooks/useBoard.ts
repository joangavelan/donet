import type { Board } from '@/types'
import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'

export const useBoard = () => {
  const { slug } = useParams()
  const boards = useQueryClient().getQueryData(['boards']) as Board[]
  const board = boards.find((board) => board.slug === slug) as Board
  return board
}
