import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { toTitleCase } from '@/utils'
import { Navigate } from 'react-router-dom'
import { Templates } from '@/features/templates/components'
import { useBoard } from '../hooks'

export const Board = () => {
  const board = useBoard()

  if (!board) {
    return <Navigate to='/boards' />
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{toTitleCase(board.name)} | Donet</title>
      </Helmet>

      <Templates />
    </React.Fragment>
  )
}
