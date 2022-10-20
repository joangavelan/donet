import type { Database } from '@/lib/supabase/types'

export type Board = Database['public']['Tables']['boards']['Row']
