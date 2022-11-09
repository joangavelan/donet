import { useMutation, useQueryClient } from 'react-query'
import { useNotification } from '@/hooks'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../api'
import type { AuthError } from '@supabase/supabase-js'

export const useSignOut = () => {
  const showNotification = useNotification()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation(signOut, {
    onError: (error) => {
      const { message } = error as AuthError
      showNotification({ type: 'error', message })
    },
    onSuccess: () => {
      queryClient.removeQueries()
      navigate('/auth/login')
    }
  })
}
