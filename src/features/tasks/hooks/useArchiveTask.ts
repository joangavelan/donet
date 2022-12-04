import { useNotification } from '@/hooks'
import type { Tasks } from '@/types'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../api'
import { useUpsertTasks } from './useUpsertTasks'

type Task = Tasks['Row']

export const useArchivetask = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()
  const upsertTasks = useUpsertTasks()

  return useMutation(deleteTask, {
    onSuccess: async (archivedTask) => {
      showNotification({ type: 'success', message: 'Task archived' })

      // update indexes of remaining tasks
      queryClient.setQueryData(['tasks', archivedTask.template_id], (tasks) => {
        const updatedTasks = (tasks as Task[])
          .filter((task) => task.id !== archivedTask.id)
          .map((task, index) => ({ ...task, index }))

        upsertTasks.mutate(updatedTasks)

        return updatedTasks
      })
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
