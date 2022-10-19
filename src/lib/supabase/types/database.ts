export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type Database = {
  public: {
    Tables: {
      boards: {
        Row: {
          id: number
          name: string
          user_id: string
          slug: string
        }
        Insert: {
          id?: number
          name?: string
          user_id: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
          slug?: string
        }
      }
      tasks: {
        Row: {
          id: number
          created_at: string | null
          title: string | null
          description: string | null
          subtasks: string[] | null
          column: string | null
          board_id: number
          user_id: string
          completed: boolean | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          title?: string | null
          description?: string | null
          subtasks?: string[] | null
          column?: string | null
          board_id: number
          user_id?: string
          completed?: boolean | null
        }
        Update: {
          id?: number
          created_at?: string | null
          title?: string | null
          description?: string | null
          subtasks?: string[] | null
          column?: string | null
          board_id?: number
          user_id?: string
          completed?: boolean | null
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
