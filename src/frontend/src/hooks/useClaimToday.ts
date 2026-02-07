import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useClientId } from './useClientId';

export function useClaimToday() {
  const { actor } = useActor();
  const clientId = useClientId();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dayName: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.claimDay(dayName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['valentineData', clientId] });
    },
  });
}
