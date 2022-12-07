import { useNotification } from '@/hooks'
import type { Tasks } from '@/types'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTask } from '../api'
import { useUpsertTasks } from './useUpsertTasks'

type Task = Tasks['Row']

export const useDeletetask = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()
  const upsertTasks = useUpsertTasks()

  return useMutation(deleteTask, {
    onSuccess: async (deletedTask) => {
      showNotification({ type: 'success', message: 'Task deleted' })

      // update indexes of remaining tasks
      queryClient.setQueryData(['tasks', deletedTask.template_id], (tasks) => {
        const updatedTasks = (tasks as Task[])
          .filter((task) => task.id !== deletedTask.id)
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
