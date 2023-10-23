import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../services/apiSettings';

export function useSettingsUpdate() {
  const queryClient = useQueryClient();
  const { mutate: editingSettings, isLoading } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
      toast.success('Settings updated successfully');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { editingSettings, isLoading };
}
