import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logIn } from '../services/apiUsers';

export function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logInFn, isLoading } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('Log in Successfull');
      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log(err.message);
      toast.error('Provided email and password are incorect');
    },
  });

  return { logInFn, isLoading };
}
