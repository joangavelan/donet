import { useNotification } from '@/hooks/useNotification'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation } from 'react-query'
import { createBoard } from '../api'

export const useCreateBoard = () => {
  const showNotification = useNotification()

  return useMutation(createBoard, {
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
