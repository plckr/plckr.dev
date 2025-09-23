import { CustomComponents } from '@/components/markdown/CustomComponents';
import { MarkdownContent } from '@/components/markdown/MarkdownContent';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { getBlogPost } from '@/lib/blog';
import { Link, NotFoundRouteProps, createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  staleTime: Infinity,
  loader: async ({ params }) => {
    const post = await getBlogPost(params.slug);
    if (!post) throw notFound();

    return { post };
  },
  notFoundComponent: NotFoundComponent
});

function BlogPostComponent() {
  const { post } = Route.useLoaderData();

  return (
    <article>
      <header className="mb-8">
        <h1 className="text-2xl font-medium tracking-tighter">{post.title}</h1>
        <p className="mt-1 max-w-[450px] opacity-70 dark:opacity-50">{post.description}</p>

        <div className="mt-2 flex items-center space-x-2 text-sm opacity-60 dark:opacity-40">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>
      </header>

      <div>
        <MarkdownContent content={post.content} customComponents={CustomComponents} />
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
