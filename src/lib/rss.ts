import { Feed } from 'feed';
import { posts } from '~local-content';

import { BASE_URL } from './constants';

export function getRssFeed() {
  const feed = new Feed({
    title: 'Ricardo Reis',
    description: 'Personal blog',
    id: BASE_URL,
    link: BASE_URL,
    language: 'en',
    copyright: `All rights reserved ${new Date().getFullYear()}`
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${BASE_URL}/blog/${post.slug}`,
      link: `${BASE_URL}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt,
      author: [{ name: 'Ricardo Reis', link: BASE_URL }],
      date: new Date(post.date),
      image: post.thumbnail ? `${BASE_URL}${post.thumbnail.src}` : undefined
    });
  });

  return feed;
}
