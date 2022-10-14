import { useMutation, useQueryClient } from 'react-query'
import { useNotification } from '@/hooks/useNotification'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../api/signOut'
import type { AuthApiError } from '@supabase/supabase-js'

export const useLogout = () => {
  const showNotification = useNotification()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation(signOut, {
    onError: (error) => {
      const { message } = error as AuthApiError
      showNotification({ type: 'error', message })
    },
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/auth/login')
    }
  })
}
