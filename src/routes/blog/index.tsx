import { Link, createFileRoute } from '@tanstack/react-router';
import { posts } from '~local-content';

import { createBlogListSEO, createSEOHead } from '~/lib/seo';

export const Route = createFileRoute('/blog/')({
  component: RouteComponent,
  staleTime: Infinity,
  loader: async () => {
    const p = [...posts].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return { posts: p };
  },
  head: () => {
    const seoConfig = createBlogListSEO();
    const { meta, links } = createSEOHead(seoConfig);

    return { meta, links };
  }
});

function RouteComponent() {
  const { posts } = Route.useLoaderData();

  return (
    <section className="space-y-4 sm:space-y-8">
      {posts.map((post) => (
        <article key={post.slug} className="dark:border-b-zinc-800">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="-m-1 block rounded-xs p-1 transition-transform hover:-translate-y-0.5"
          >
            <header>
              <h3 className="font-semibold underline decoration-zinc-300 decoration-1 underline-offset-4">
                {post.title}
              </h3>
              <p className="mt-1 opacity-80 dark:opacity-70">{post.excerpt}</p>
            </header>

            <footer className="mt-1 flex items-center space-x-2 text-sm opacity-70 dark:opacity-50">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>·</span>
              <span>{post.metadata.readingTime} min read</span>
            </footer>
          </Link>
        </article>
      ))}
    </section>
  );
}
