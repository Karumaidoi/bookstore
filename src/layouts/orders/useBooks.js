import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../../services/apiOrders';

export function useBooks() {
  const {
    isLoading,
    data: books,
    error,
  } = useQuery({
    queryKey: ['books'],
    queryFn: () => getBooks(),
  });

  return { isLoading, books, error };
}
