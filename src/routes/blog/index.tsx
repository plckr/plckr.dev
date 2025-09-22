import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/')({
  component: RouteComponent
});

function RouteComponent() {
  return (
    <section className="space-y-4 sm:space-y-8">
      {Array(3)
        .fill('')
        .map(() => (
          <article className="dark:border-b-zinc-800">
            <a
              href="/blog/realtime-audio"
              className="-m-1 block rounded-xs p-1 transition-transform hover:-translate-y-0.5"
            >
              <header>
                <h3 className="font-semibold underline decoration-zinc-300 decoration-1 underline-offset-4">
                  Lorem ipsum dolor sit amet, consectetur
                </h3>
                <p className="mt-1 opacity-80 dark:opacity-70">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus eros
                  egestas risus vulputate, vitae rutrum felis.
                </p>
              </header>

              <footer className="mt-1 flex items-center space-x-2 text-sm opacity-70 dark:opacity-50">
                <time>September 21, 2025</time>
                <span>·</span>
                <span>6 min read</span>
              </footer>
            </a>
          </article>
        ))}
    </section>
  );
}
