import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';

import { getRssFeed } from '~/lib/rss';

export const Route = createFileRoute('/feed.json')({
  server: {
    handlers: {
      GET: async () => {
        const feed = getRssFeed();

        return json(feed.json1(), {
          headers: {
            'Content-Type': 'application/feed+json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600'
          }
        });
      }
    }
  }
});
