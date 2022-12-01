import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTask } from '../api'

export const useCreateTask = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()

  return useMutation(createTask, {
    onSuccess: async (task) => {
      await queryClient.invalidateQueries(['tasks', task.template_id])
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
