import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../api'

export const useArchivetask = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()

  return useMutation(deleteTask, {
    onSuccess: async (archivedTask) => {
      await queryClient.invalidateQueries(['tasks', archivedTask.template_id])
      showNotification({ type: 'success', message: 'Task archived' })
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
