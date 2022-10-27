import { deleteTemplatesFromBoard } from '@/features/templates/api'
import { useNotification } from '@/hooks'
import type { PostgrestError } from '@supabase/supabase-js'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { deleteBoard } from '../api'

export const useDeleteBoard = () => {
  const queryClient = useQueryClient()
  const showNotification = useNotification()
  const navigate = useNavigate()

  return useMutation(deleteBoard, {
    onMutate: async (boardId) => {
      try {
        await deleteTemplatesFromBoard(boardId)
      } catch (error) {
        const { message } = error as PostgrestError
        showNotification({ type: 'error', message })
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['boards'])
      showNotification({
        type: 'success',
        message: 'The board has been deleted'
      })
      navigate('/boards')
    },
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
