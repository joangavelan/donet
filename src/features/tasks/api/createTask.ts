import { supabase } from '@/lib/supabase'
import type { Tasks } from '@/types'

export const createTask = async (newTask: Tasks['Insert']) => {
  const { data: createdTask, error } = await supabase
    .from('tasks')
    .insert(newTask)
    .select()
    .single()
  if (error) throw error
  return createdTask
}
