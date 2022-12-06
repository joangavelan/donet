import { supabase } from '@/lib/supabase'

export const deleteTemplate = async (templateId: number) => {
  const { data: deletedTemplate, error } = await supabase
    .from('templates')
    .delete()
    .eq('id', templateId)
    .select()
    .single()

  if (error) throw error

  return deletedTemplate
}
