import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '../services/apiUsers';

export function useSignUpUser() {
  const {
    mutate: signUpUser,
    isLoading: isSigningUp,
    error,
  } = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Created user successfully`);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { signUpUser, isSigningUp, error };
}
