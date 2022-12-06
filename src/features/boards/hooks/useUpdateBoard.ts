import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBoard } from '../api'

export const useUpdateBoard = () => {
  const showNotification = useNotification()
  const queryClient = useQueryClient()

  return useMutation(updateBoard, {
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    },
    onSettled: async () => {
      await queryClient.invalidateQueries(['boards'])
    }
  })
}
