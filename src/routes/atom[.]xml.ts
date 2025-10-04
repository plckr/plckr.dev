import { createFileRoute } from '@tanstack/react-router';

import { getRssFeed } from '~/lib/rss';

export const Route = createFileRoute('/atom.xml')({
  server: {
    handlers: {
      GET: async () => {
        const feed = getRssFeed();

        return new Response(feed.atom1(), {
          headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
          }
        });
      }
    }
  }
});
