import type { Database } from '@/lib/supabase/types'
import type { FormValues as CreateTaskFormFields } from '@/features/tasks/components'

export type DBTables = Database['public']['Tables']

export type Boards = DBTables['boards']

export type Templates = DBTables['templates']

export type Tasks = DBTables['tasks']

export type Subtasks = CreateTaskFormFields['subtasks']
