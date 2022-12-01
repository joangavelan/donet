import { useNotification } from '@/hooks'
import type { Tasks } from '@/types'
import type { PostgrestError } from '@supabase/postgrest-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTask } from '../api'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()

  return useMutation(updateTask, {
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries(['tasks'])

      queryClient.setQueryData(['tasks', updatedTask.template_id], (tasks) => {
        return (tasks as Array<Tasks['Row']>).map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      })
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['tasks'])
    }
  })
}
