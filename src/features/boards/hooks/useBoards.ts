import { useQuery } from 'react-query'
import { getBoards } from '../api'
import type { PostgrestError } from '@supabase/supabase-js'
import { useNotification } from '@/hooks'

export const useBoards = () => {
  const showNotification = useNotification()

  return useQuery(['boards'], getBoards, {
    onError: (error) => {
      const { message } = error as PostgrestError
      showNotification({ type: 'error', message })
    }
  })
}
