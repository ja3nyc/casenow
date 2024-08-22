import { SupabaseClient } from '@supabase/supabase-js';
import { useQuery } from '@tanstack/react-query';

export function getUser({
    supabase
}:{
    supabase: SupabaseClient
}) {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
  });
}
