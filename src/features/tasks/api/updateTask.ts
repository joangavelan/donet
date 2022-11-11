import { supabase } from '@/lib/supabase'
import type { Tasks } from '@/types'

type Payload = {
  originalTask: Tasks['Row']
  updatedProps: Tasks['Update']
}

export const updateTask = async ({ originalTask, updatedProps }: Payload) => {
  const { data: updatedTask, error } = await supabase
    .from('tasks')
    .update({ ...originalTask, ...updatedProps })
    .eq('id', originalTask.id)
    .select()
    .single()

  if (error) throw error

  return updatedTask
}
