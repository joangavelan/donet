import { supabase } from '@/lib/supabase'
import type { Templates } from '@/types'

export const createTemplate = async (newTemplate: Templates['Insert']) => {
  const { data: createdTemplate, error } = await supabase
    .from('templates')
    .insert(newTemplate)
    .select()
    .single()

  if (error) throw error

  return createdTemplate
}
