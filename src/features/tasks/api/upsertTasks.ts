import { supabase } from '@/lib/supabase'
import type { Tasks } from '@/types'

export const upsertTasks = async (tasks: Array<Tasks['Row']>) => {
  const { data: upsertedTasks, error } = await supabase.from('tasks').upsert(tasks).select()

  if (error) throw error

  return upsertedTasks
}
