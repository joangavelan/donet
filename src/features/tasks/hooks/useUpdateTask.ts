import { useNotification } from '@/hooks'
import type { Tasks } from '@/types'
import type { PostgrestError } from '@supabase/postgrest-js'
import { useMutation, useQueryClient } from 'react-query'
import { updateTask } from '../api'

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()

  return useMutation(updateTask, {
    onMutate: async ({ originalTask, updatedProps }) => {
      await queryClient.cancelQueries(['tasks'])

      const previousTasksFromOriginalTemplate = queryClient.getQueryData([
        'tasks',
        originalTask.template_id
      ]) as Array<Tasks['Row']>

      const previousTasksFromNewTemplate =
        updatedProps.template_id &&
        (queryClient.getQueryData(['tasks', updatedProps.template_id]) as Array<
          Tasks['Row']
        >)

      const updatedTask = { ...originalTask, ...updatedProps }

      if (previousTasksFromNewTemplate) {
        queryClient.setQueryData(
          ['tasks', updatedProps.template_id],
          [...previousTasksFromNewTemplate, updatedTask]
        )

        queryClient.setQueryData(
          ['tasks', originalTask.template_id],
          previousTasksFromOriginalTemplate.filter(
            (task) => originalTask.id !== task.id
          )
        )
      } else {
        queryClient.setQueryData(
          ['tasks', originalTask.template_id],
          previousTasksFromOriginalTemplate.map((task) =>
            originalTask.id === task.id ? updatedTask : task
          )
        )
      }

      return { previousTasksFromOriginalTemplate, previousTasksFromNewTemplate }
    },
    onError: (error, { originalTask, updatedProps }, context) => {
      if (updatedProps.template_id) {
        queryClient.setQueryData(
          ['tasks', updatedProps.template_id],
          context?.previousTasksFromNewTemplate
        )
      }

      queryClient.setQueryData(
        ['tasks', originalTask.template_id],
        context?.previousTasksFromOriginalTemplate
      )

      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['tasks'])
    }
  })
}
