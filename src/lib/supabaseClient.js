import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const saveCurve = async (curveData) => {
  const { data, error } = await supabase
    .from('qpcr_curves')
    .insert([
      {
        name: curveData.name,
        parameters: curveData.parameters,
        data: curveData.data,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const loadCurves = async () => {
  const { data, error } = await supabase
    .from('qpcr_curves')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) throw error
  return data || []
}

export const deleteCurve = async (id) => {
  const { error } = await supabase
    .from('qpcr_curves')
    .delete()
    .eq('id', id)

  if (error) throw error
}
