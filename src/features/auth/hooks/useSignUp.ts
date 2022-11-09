import { useMutation } from 'react-query'
import { useNotification } from '@/hooks'
import { signUp } from '../api'
import type { AuthError } from '@supabase/supabase-js'

export const useSignUp = () => {
  const showNotification = useNotification()

  return useMutation(signUp, {
    onError: (error) => {
      const { message } = error as AuthError
      showNotification({ type: 'error', message })
    }
  })
}
