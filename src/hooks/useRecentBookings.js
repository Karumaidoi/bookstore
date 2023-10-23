import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { getBooksByDate } from '../services/apiOrders';

export function useRecentBookings() {
  const queryDate = subDays(new Date(), 7).toISOString();
  const { data, isLoading, error } = useQuery({
    queryFn: () => getBooksByDate(queryDate),
    queryKey: ['recentOrders'],
  });

  console.log(data);

  return { data, isLoading, error };
}
