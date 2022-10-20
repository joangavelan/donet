import { useNotification } from '@/hooks'
import type { AuthApiError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteBoard } from '../api'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()
  const navigate = useNavigate()

  return useMutation(deleteBoard, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['boards'])
      showNotification({
        type: 'warning',
        message: 'The board has been deleted'
      })
      navigate('/boards')
    },
    onError: (error) => {
      const { message } = error as AuthApiError
      showNotification({ type: 'error', message })
    }
  })
}
