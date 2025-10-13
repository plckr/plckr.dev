import { createFileRoute } from '@tanstack/react-router';
import { createMiddleware, json } from '@tanstack/react-start';
import * as z from 'zod/v4';

import { supabase } from '~/lib/supabase.server';

const SESSION_MAX_COUNT = 13;

const postClapSchema = z.object({
  post_slug: z.string(),
  claps_count: z.number(),
  posthog_session_id: z.string(),
  created_at: z.string()
});

type PostClapResult = {
  postSlug: string;
  count: number;
  sessionCount: number | null;
  sessionMaxCount: number;
};

async function getPostClap(postSlug: string, sessionId?: string | null): Promise<PostClapResult> {
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

  const sessionCount = postClapSchema
    .nullable()
    .transform((data) => data?.claps_count ?? null)
    .parse(sessionResult.data);

  return {
    postSlug,
    count: totalResult.data?.sum ?? 0,
    sessionCount,
    sessionMaxCount: SESSION_MAX_COUNT
  } satisfies PostClapResult;
}

async function upsertSessionPostClap(
  postSlug: string,
  sessionId: string | null,
  clapsCount: number
) {
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

        const newCount = bodyJson.claps_count;

        if (newCount > SESSION_MAX_COUNT) {
          return new Response('Claps count is greater than the session max count', { status: 400 });
        }

        try {
          await upsertSessionPostClap(slug, context.sessionId, newCount);
          return new Response('', { status: 200 });
        } catch (error) {
          console.error('Invalid return from database', error);
          return new Response('', { status: 500 });
        }
      }
    }
  }
});
