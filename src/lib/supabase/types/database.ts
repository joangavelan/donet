export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Database {
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
          name: string
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
          title: string
          description: string
          subtasks: string
          user_id: string
          template_id: number
        }
        Insert: {
          id?: number
          title: string
          description: string
          subtasks: string
          user_id: string
          template_id: number
        }
        Update: {
          id?: number
          title?: string
          description?: string
          subtasks?: string
          user_id?: string
          template_id?: number
        }
      }
      templates: {
        Row: {
          id: number
          name: string
          user_id: string
          board_id: number
        }
        Insert: {
          id?: number
          name: string
          user_id: string
          board_id: number
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
          board_id?: number
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
