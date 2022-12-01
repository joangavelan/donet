import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBoard } from '../api'

export const useCreateBoard = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()

  return useMutation(createBoard, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['boards'])
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
