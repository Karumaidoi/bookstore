import { subDays } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { getUsersByDate } from '../services/apiUsers';

export function useRecentUsers() {
  const queryDate = subDays(new Date(), 7).toISOString();
  const {
    data: recentUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['recentUsers'],
    queryFn: () => getUsersByDate(queryDate),
  });

  console.log(recentUsers);

  return { recentUsers, isLoading, error };
}
