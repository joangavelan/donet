import { Box } from '@chakra-ui/layout'
import { useParams } from 'react-router'

export const Board = () => {
  const { board } = useParams()

  return <Box>{board}</Box>
}
