import { createFileRoute } from '@tanstack/react-router';
import { createMiddleware, json } from '@tanstack/react-start';
import * as z from 'zod';

import { supabase } from '~/lib/supabase.server';

const SESSION_MAX_COUNT = 13;

const postClapSchema = z.object({
  post_slug: z.string(),
  claps_count: z.number(),
  posthog_session_id: z.string(),
  created_at: z.string()
});

export type PostClapResult = {
  postSlug: string;
  count: number;
  sessionCount: number;
  sessionMaxCount: number;
};

async function getPostClap(postSlug: string, sessionId: string): Promise<PostClapResult> {
  const [totalResult, sessionResult] = await Promise.all([
    supabase.from('post_claps').select('claps_count.sum()').eq('post_slug', postSlug).maybeSingle(),
    supabase
      .from('post_claps')
      .select('*')
      .eq('post_slug', postSlug)
      .eq('posthog_session_id', sessionId)
      .maybeSingle()
  ]);

  const error = totalResult.error ?? sessionResult.error;
  if (error) {
    console.error('Error getting post clap', error);
  }

  return {
    postSlug,
    count: totalResult.data?.sum ?? 0,
    sessionCount: sessionResult.data?.claps_count ?? 0,
    sessionMaxCount: SESSION_MAX_COUNT
  };
}

async function upsertSessionPostClap(
  postSlug: string,
  sessionId: string,
  clapsCount: number
): Promise<void> {
  const { error } = await supabase
    .from('post_claps')
    .upsert({
      post_slug: postSlug,
      claps_count: clapsCount,
      posthog_session_id: sessionId
    })
    .eq('posthog_session_id', sessionId);

  if (error) {
    console.error('Error upserting post clap', error);
    throw error;
  }
}

export const Route = createFileRoute('/api/posts/$slug/claps')({
  server: {
    middleware: [
      createMiddleware().server(async ({ next, request }) => {
        const sessionId = request.headers.get('X-POSTHOG-SESSION-ID');

        if (!sessionId) {
          throw new Response('Missing Session ID', { status: 400 });
        }

        return next({ context: { sessionId } });
      })
    ],
    handlers: {
      GET: async ({ params, context }) => {
        const { slug } = params;

        return json(await getPostClap(slug, context.sessionId));
      },
      PATCH: async ({ params, request, context }) => {
        const { slug } = params;

        const bodyJson = postClapSchema.pick({ claps_count: true }).parse(await request.json());
        const newCount = Math.min(bodyJson.claps_count, SESSION_MAX_COUNT);

        try {
          await upsertSessionPostClap(slug, context.sessionId, newCount);
          return new Response('', { status: 200 });
        } catch (error) {
          console.error('Invalid return from database', error);
          return new Response('An unknown error occurred', { status: 500 });
        }
      }
    }
  }
});
