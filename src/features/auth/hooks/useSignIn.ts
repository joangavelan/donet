import { useMutation } from '@tanstack/react-query'
import { useNotification } from '@/hooks'
import { signIn } from '../api'
import type { AuthError } from '@supabase/supabase-js'

export const useSignIn = () => {
  const showNotification = useNotification()

  return useMutation(signIn, {
    onError: (error) => {
      const { message } = error as AuthError
      showNotification({ type: 'error', message })
    }
  })
}
