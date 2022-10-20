import type { Board as TBoard } from '@/types'
import { Text } from '@chakra-ui/react'
import { useQueryClient } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'

export const Board = () => {
  const { slug } = useParams()
  const boards = useQueryClient().getQueryData(['boards']) as TBoard[]
  const board = boards?.find((board) => board.slug === slug)

  if (!board) {
    return <Navigate to='/boards' />
  }

  return <Text textTransform='capitalize'>{board?.id}</Text>
}
