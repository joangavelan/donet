import type { Database } from '@/lib/supabase/types'

export type DBTables = Database['public']['Tables']

export type Boards = DBTables['boards']

export type Templates = DBTables['templates']

export type Tasks = DBTables['tasks']
