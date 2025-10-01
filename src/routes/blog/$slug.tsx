import { Link, NotFoundRouteProps, createFileRoute, notFound } from '@tanstack/react-router';
import { posts } from '~local-content';

import { MDXContent } from '~/components/mdx-content';
import { Button } from '~/components/ui/button';
import { Icon } from '~/components/ui/icon';
import { createBlogPostSEO, createSEOHead } from '~/lib/seo';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  staleTime: Infinity,
  loader: async ({ params }) => {
    const post = posts.find((post) => post.slug === params.slug);
    if (!post) throw notFound();

    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;

    const seoConfig = createBlogPostSEO(post);
    const { meta, links } = createSEOHead(seoConfig);

    return { meta, links };
  },
  notFoundComponent: NotFoundComponent
});

function BlogPostComponent() {
  const { post } = Route.useLoaderData();

  return (
    <article>
      <header>
        <div className="relative mb-8 rounded-lg md:-mx-4">
          <img
            src={post.thumbnail.src}
            width={post.thumbnail.width}
            height={post.thumbnail.height}
            alt={post.title}
            className="rounded-lg"
          />
        </div>

        <h1 className="text-3xl font-extrabold">{post.title}</h1>
        <p className="mt-1 opacity-70 dark:opacity-50">{post.excerpt}</p>

        <div className="mt-2 flex items-center space-x-2 text-sm opacity-60 dark:opacity-40">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>·</span>
          <span>{post.metadata.readingTime} min read</span>
        </div>
      </header>

      <div className="prose prose-sm dark:prose-invert mt-12 max-w-full">
        <MDXContent code={post.mdx} />
      </div>
    </article>
  );
}

function NotFoundComponent(_props: NotFoundRouteProps) {
  return (
    <section>
      <h1 className="text-foreground/50 tracking-wide">404</h1>
      <p className="text-2xl font-medium">Article not found.</p>
      <Button variant="default" asChild className="mt-6">
        <Link to="/blog">
          <Icon.ArrowLeft /> back to blog
        </Link>
      </Button>
    </section>
  );
}
