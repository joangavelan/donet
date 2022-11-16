import { supabase } from '@/lib/supabase'

export const deleteTask = async (taskId: number) => {
  const { data: archivedTask, error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId)
    .select()
    .single()

  if (error) throw error

  return archivedTask
}
