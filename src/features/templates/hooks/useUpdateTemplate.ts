import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTemplate } from '../api'

export const useUpdateTemplate = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()

  return useMutation(updateTemplate, {
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    },
    onSettled: async (updatedTemplate) => {
      await queryClient.invalidateQueries(['templates', updatedTemplate?.board_id])
    }
  })
}
