'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import * as z from 'zod/v4';

import { cn, getNextFibonacci } from '~/lib/utils';

import { Button } from './ui/button';

const localClapsSchema = z
  .record(
    z.string(),
    z.object({
      count: z.number(),
      sessionId: z.string()
    })
  )
  .nullable()
  .catch(() => null)
  .transform((data) => data ?? {});

type LocalClaps = z.infer<typeof localClapsSchema>;
type PostLocalClaps = LocalClaps[keyof LocalClaps];

const LOCAL_STORAGE_CLAPS_KEY = 'post-claps';

function getAllLocalClaps() {
  const localClaps = localStorage.getItem(LOCAL_STORAGE_CLAPS_KEY);
  return z
    .preprocess((data) => {
      try {
        return JSON.parse(String(data));
      } catch {
        window.localStorage.removeItem(LOCAL_STORAGE_CLAPS_KEY);
        return null;
      }
    }, localClapsSchema)
    .parse(localClaps);
}

function getPostLocalClaps(postSlug: string, sessionId: string): PostLocalClaps | null {
  const allLocalClaps = getAllLocalClaps();

  if (postSlug in allLocalClaps) {
    const postLocalClaps = allLocalClaps[postSlug];
    if (postLocalClaps.sessionId === sessionId) {
      return postLocalClaps;
    }
  }

  return null;
}

function setLocalClaps(postSlug: string, sessionId: string, count: number) {
  const allLocalClaps = getAllLocalClaps();
  allLocalClaps[postSlug] = {
    count,
    sessionId
  };

  window.localStorage.setItem(LOCAL_STORAGE_CLAPS_KEY, JSON.stringify(allLocalClaps));
}

function useLocalClaps(postSlug: string) {
  const sessionId = usePostHog().get_session_id();
  const [postLocalClaps, setPostLocalClaps] = useState<PostLocalClaps | null>(
    getPostLocalClaps(postSlug, sessionId)
  );

  return {
    postClaps: postLocalClaps,
    updateCount: (count: number) => {
      const allLocalClaps = getAllLocalClaps();
      allLocalClaps[postSlug] = {
        count,
        sessionId
      };

      setPostLocalClaps(allLocalClaps[postSlug]);
      setLocalClaps(postSlug, sessionId, count);
    }
  };
}

function incrementClapMutation(data: { postSlug: string; clapsCount: number }) {
  const queryClient = useQueryClient();
  const sessionId = usePostHog().get_session_id();

  return useMutation({
    mutationFn: async () => {
      return fetch(`/api/posts/${data.postSlug}/claps`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-POSTHOG-SESSION-ID': sessionId
        },
        body: JSON.stringify({
          count: data.clapsCount
        })
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post-claps'] });
    }
  });
}

function usePostClaps(postSlug: string) {
  const sessionId = usePostHog().get_session_id();

  const query = useQuery({
    queryKey: ['post-claps', { postSlug, sessionId }],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return fetch(`/api/posts/${postSlug}/claps`, {
        headers: {
          'X-POSTHOG-SESSION-ID': sessionId
        }
      }).then((res) => res.json());
    }
  });

  return {
    count: query.data?.count ?? 0,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    incrementClap: incrementClapMutation({ postSlug, clapsCount: 1 }).mutate
  };
}

export function ClapsButton({ postSlug }: { postSlug: string }) {
  const clapsQuery = usePostClaps(postSlug);
  const isLoading = clapsQuery.isLoading;

  const claps = useLocalClaps(postSlug);
  const currentCount = claps.postClaps?.count ?? 0;

  return (
    <Button
      variant="outline"
      className={cn(
        'fixed right-4 bottom-4 duration-700 motion-safe:transition-all',
        isLoading && 'translate-y-4 opacity-0'
      )}
      onClick={() => {
        // Increase clap count
        // make an animation
        const nextCount = getNextFibonacci(currentCount);
        if (nextCount > 13) return;
        console.log(currentCount, nextCount);

        claps.updateCount(nextCount);
        // clapsQuery.incrementClap();
      }}
    >
      {currentCount} 👏
    </Button>
  );
}
