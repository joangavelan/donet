import type { Database } from '@/lib/supabase/types'

export type Board = Database['public']['Tables']['boards']['Row']

export type Template = Database['public']['Tables']['templates']['Row']
