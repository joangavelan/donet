import { supabase } from '@/lib/supabase'

export const deleteTask = async (taskId: number) => {
  const { data: deletedTask, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw error

  return deletedTask
}
