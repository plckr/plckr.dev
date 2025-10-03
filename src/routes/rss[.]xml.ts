import { createFileRoute } from '@tanstack/react-router';
import { Feed } from 'feed';
import { posts } from '~local-content';

export const Route = createFileRoute('/rss.xml')({
  server: {
    handlers: {
      GET: async () => {
        const siteUrl = 'https://plckr.dev';

        const feed = new Feed({
          title: 'Ricardo Reis',
          description: 'Personal blog',
          id: siteUrl,
          link: siteUrl,
          language: 'en',
          copyright: `All rights reserved ${new Date().getFullYear()}`
        });

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: `${siteUrl}/blog/${post.slug}`,
            link: `${siteUrl}/blog/${post.slug}`,
            description: post.excerpt,
            content: post.excerpt,
            author: [{ name: 'Ricardo Reis', link: siteUrl }],
            date: new Date(post.date),
            image: `${siteUrl}${post.thumbnail.src}`
          });
        });

        return new Response(feed.rss2(), {
          headers: {
            'Content-Type': 'application/rss+xml'
          }
        });
      }
    }
  }
});
