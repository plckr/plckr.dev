import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePostHog } from 'posthog-js/react';
import { useCallback } from 'react';

import type { PostClapResult } from '~/routes/api/posts.$slug.claps';

import { useDebounce } from './debounce';

const MAIN_QUERY_KEY = 'post-claps' as const;

function queryKey(): readonly [typeof MAIN_QUERY_KEY];
function queryKey(params: {
  postSlug: string;
  sessionId: string;
}): readonly [typeof MAIN_QUERY_KEY, { postSlug: string; sessionId: string }];
function queryKey(params?: { postSlug: string; sessionId: string }) {
  if (!params) {
    return [MAIN_QUERY_KEY] as const;
  }

  return [MAIN_QUERY_KEY, params] as const;
}

function usePostClapsQuery({ postSlug, sessionId }: { postSlug: string; sessionId: string }) {
  const query = useQuery<PostClapResult>({
    queryKey: queryKey({ postSlug, sessionId }),
    queryFn: async () => {
      return fetch(`/api/posts/${postSlug}/claps`, {
        headers: {
          'X-POSTHOG-SESSION-ID': sessionId
        }
      }).then((res) => res.json());
    }
  });

  return query;
}

function updateClapMutation({ postSlug, sessionId }: { postSlug: string; sessionId: string }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (clapsCount: number) => {
      return fetch(`/api/posts/${postSlug}/claps`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-POSTHOG-SESSION-ID': sessionId
        },
        body: JSON.stringify({
          claps_count: clapsCount
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey() });
    }
  });

  const debouncedMutate = useDebounce(mutation.mutate, 1000);

  const optimisticMutate = useCallback(
    (clapsCount: number) => {
      queryClient.setQueryData<PostClapResult>(queryKey({ postSlug, sessionId }), (oldData) => {
        if (!oldData) return undefined;

        return {
          ...oldData,
          count: oldData.count - oldData.sessionCount + clapsCount,
          sessionCount: clapsCount
        };
      });

      debouncedMutate(clapsCount);
    },
    [debouncedMutate, postSlug, sessionId, queryClient]
  );

  return {
    ...mutation,
    mutate: optimisticMutate
  };
}

export function usePostClaps(postSlug: string) {
  const sessionId = usePostHog().get_session_id();
  const updateMutation = updateClapMutation({ postSlug, sessionId });

  const { data, isLoading, isError } = usePostClapsQuery({ postSlug, sessionId });

  return {
    isLoading,
    isError,
    data,
    updateCount: (clapsCount: number) => {
      return updateMutation.mutate(clapsCount);
    }
  };
}
