import { supabase } from '@/lib/supabase'

export const archiveTemplate = async (templateId: number) => {
  const { data: archivedTemplate, error } = await supabase
    .from('templates')
    .delete()
    .eq('id', templateId)
    .select()
    .single()

  if (error) throw error

  return archivedTemplate
}
