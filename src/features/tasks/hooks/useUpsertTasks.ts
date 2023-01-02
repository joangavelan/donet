import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/postgrest-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsertTasks } from '../api'

export const useUpsertTasks = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()

  return useMutation(upsertTasks, {
    onError: async (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
      await queryClient.invalidateQueries(['tasks'])
    }
  })
}
