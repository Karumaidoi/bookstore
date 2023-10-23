import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/apiUsers';

export function useUsers() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  return { data, isLoading, error };
}
