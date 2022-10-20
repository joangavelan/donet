import type { Board as TBoard } from '@/types'
import { Helmet } from 'react-helmet-async'
import { toTitleCase } from '@/utils'
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

  return (
    <>
      <Helmet>
        <title>{toTitleCase(board.name)} | Donet</title>
      </Helmet>
      <Text textTransform='capitalize'>{board?.id}</Text>
    </>
  )
}
