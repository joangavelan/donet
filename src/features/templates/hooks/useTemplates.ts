import { useQuery } from 'react-query'
import { getTemplates } from '../api'

export const useTemplates = (boardId: number) => {
  return useQuery(['templates', boardId], async () => await getTemplates(boardId))
}
