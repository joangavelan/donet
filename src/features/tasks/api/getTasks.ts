import { supabase } from '@/lib/supabase'

export const getTasks = async (templateId: number) => {
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select()
    .eq('template_id', templateId)
    .order('index', { ascending: true })

  if (error) throw error

  return tasks
}
