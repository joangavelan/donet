import { supabase } from '@/lib/supabase'
import type { Template } from '@/types'

type newTemplate = Omit<Template, 'id'>

export const createTemplate = async (newTemplate: newTemplate) => {
  const { data: createdTemplate, error } = await supabase
    .from('templates')
    .insert(newTemplate)
    .select()
    .single()
  if (error) throw error
  return createdTemplate
}
