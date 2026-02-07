import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useClientId } from './useClientId';
import { useAccessGate } from './useAccessGate';
import type { ClaimResponse } from '../backend';

export function useGetUserValentineData() {
  const { actor, isFetching: actorFetching } = useActor();
  const clientId = useClientId();
  const { isUnlocked } = useAccessGate();

  return useQuery<ClaimResponse>({
    queryKey: ['valentineData', clientId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      const response = await actor.getUserValentineData();
      return response;
    },
    enabled: !!actor && !actorFetching && isUnlocked,
  });
}
