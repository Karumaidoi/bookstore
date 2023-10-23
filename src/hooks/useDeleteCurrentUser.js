import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { deleteCurrentAdmin } from '../services/apiUsers';

export function useDeleteCurrentUser() {
  const navigate = useNavigate();
  const {
    mutate: deleteAdmin,
    isLoading: isDeletingAdmin,
    error,
  } = useMutation({
    mutationFn: deleteCurrentAdmin,
    onSuccess: () => {
      navigate('/login');
      toast.success('Account deleted successfully');
    },
    onError: (error) => {
      toast.error(error?.message);
    },
  });

  return { deleteAdmin, isDeletingAdmin, error };
}
