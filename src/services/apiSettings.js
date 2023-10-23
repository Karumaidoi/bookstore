import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase.from('Settings').select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateSetting(newSettings) {
  const { data, error } = await supabase.from('Settings').update(newSettings).eq('id', 1).single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
}
