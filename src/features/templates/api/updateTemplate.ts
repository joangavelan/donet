import { supabase } from '@/lib/supabase'
import type { Templates } from '@/types'

export const updateTemplate = async (template: Templates['Update']) => {
  const { data: updatedTemplate, error } = await supabase
    .from('templates')
    .update(template)
    .eq('id', template.id)
    .select()
    .single()

  if (error) throw error

  return updatedTemplate
}
