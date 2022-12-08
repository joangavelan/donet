import { useQuery } from '@tanstack/react-query'
import { getTasks } from '../api'

export const useTasks = (templateId: number) => {
  return useQuery(['tasks', templateId], async () => await getTasks(templateId))
}
