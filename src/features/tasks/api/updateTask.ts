import { supabase } from '@/lib/supabase'
import type { Tasks } from '@/types'

export const updateTask = async (task: Tasks['Row']) => {
  const { data: updatedTask, error } = await supabase
    .from('tasks')
    .update(task)
    .eq('id', task.id)
    .select()
    .single()

  if (error) throw error

  return updatedTask
}
