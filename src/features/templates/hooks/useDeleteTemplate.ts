import { useBoard } from '@/features/boards/hooks'
import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteTemplate } from '../api'

export const useDeleteTemplate = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()
  const board = useBoard()

  return useMutation(deleteTemplate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['templates', board.id])
      showNotification({ type: 'success', message: 'Template deleted' })
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
