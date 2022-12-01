import type { User } from '@supabase/supabase-js'
import { useQueryClient } from '@tanstack/react-query'

export const useUser = () => {
  return useQueryClient().getQueryData(['user']) as User
}
