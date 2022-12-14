import type { FormValues as CreateTaskFormFields } from '@/features/tasks/components'

export type Subtasks = CreateTaskFormFields['subtasks']

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Database {
  public: {
    Tables: {
      boards: {
        Row: {
          id: number
          name: string
          slug: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          user_id?: string
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: number
          title: string
          description: string
          subtasks: Subtasks
          template_id: number
          index: number
        }
        Insert: {
          id?: number
          title: string
          description: string
          subtasks: Subtasks
          template_id: number
          index: number
        }
        Update: {
          id?: number
          title?: string
          description?: string
          subtasks?: Subtasks
          template_id?: number
          index?: number
        }
      }
      templates: {
        Row: {
          id: number
          name: string
          board_id: number
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          board_id: number
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          board_id?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
