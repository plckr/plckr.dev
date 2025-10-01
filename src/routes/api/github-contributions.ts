import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';

import { GITHUB_USERNAME } from '~/lib/constants';
import { sum } from '~/lib/utils';

export type GithubContributionsResponse = {
  contributions: {
    date: string;
    count: number;
    level: number;
  }[];
  total: Record<string, number>;
};

export const Route = createFileRoute('/api/github-contributions')({
  server: {
    handlers: {
      GET: async () => {
        const url = new URL(
          `/v4/${GITHUB_USERNAME}`,
          'https://github-contributions-api.jogruber.de'
        );
        url.searchParams.set('y', 'last');

        const response = await fetch(url);

        if (!response.ok) {
          return Response.json({ status: 500, message: 'GitHub API error' }, { status: 500 });
        }

        const data: GithubContributionsResponse = await response.json();
        const result = {
          contributions: data.contributions,
          total: sum(Object.values(data.total))
        };

        const daySeconds = 60 * 60 * 24;

        return json(result, {
          headers: {
            'Cache-Control': `public, max-age=${daySeconds}, s-maxage=${daySeconds}`,
            Expires: new Date(Date.now() + daySeconds * 1000).toUTCString()
          }
        });
      }
    }
  }
});
