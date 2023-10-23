import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiUsers';

export function useCurrentUser() {
  const { data, error, isLoading } = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ['user'],
  });

  return { data, error, isLoading, isAuthenticated: data?.role === 'authenticated' };
}
