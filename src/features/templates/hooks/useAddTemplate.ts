import { useBoard } from '@/features/boards/hooks'
import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTemplate } from '../api'

export const useAddTemplate = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()
  const board = useBoard()

  return useMutation(createTemplate, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['templates', board.id])
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
