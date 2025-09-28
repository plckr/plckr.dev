import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FileRouteTypes } from '@/routeTree.gen';
import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useMatchRoute
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ComponentProps } from 'react';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' }
    ],
    links: [{ rel: 'stylesheet', href: appCss }]
  }),
  shellComponent: RootDocument,
  component: RootComponent
});

function RootComponent() {
  const matchRoute = useMatchRoute();

  const navLinks: { title: string; to: FileRouteTypes['fullPaths'] }[] = [
    {
      title: 'about',
      to: '/'
    },
    {
      title: 'blog',
      to: '/blog'
    }
  ];

  return (
    <ThemeProvider defaultTheme="dark" storageKey="plckr.dev-theme">
      <main className="mx-4 mt-2 mb-40 px-4 sm:mt-8 sm:max-w-screen-lg sm:px-6 md:mx-auto md:max-w-2xl md:px-8">
        <header className="flex flex-col items-start justify-start pt-8 pb-12">
          <div className="flex items-center gap-4 pl-4 sm:pl-0">
            <Avatar asChild className="size-10">
              <Link to="/">
                <AvatarImage src="https://avatars.githubusercontent.com/u/11768109" />
                <AvatarFallback>RR</AvatarFallback>
              </Link>
            </Avatar>

            <div>
              <p className="text-medium inline-block font-medium">
                <Link to="/" className="-m-0.5 rounded-xs p-0.5">
                  Ricardo Reis
                </Link>
              </p>
              <p className="opacity-60">full stack engineer</p>
            </div>
          </div>

          <nav className="mt-8 flex w-full items-center justify-between gap-2 sm:my-4 sm:justify-end">
            <div className="inline-flex items-center gap-2">
              {navLinks.map((link) => {
                const isActive = matchRoute({ to: link.to, fuzzy: true });
                const buttonVariant: ComponentProps<typeof Button>['variant'] = isActive
                  ? 'outline'
                  : 'ghost';

                return (
                  <Button variant={buttonVariant} asChild>
                    <Link to={link.to}>{link.title}</Link>
                  </Button>
                );
              })}
            </div>

            <ThemeToggle variant="ghost" />
          </nav>
        </header>

        <Outlet />
      </main>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-left'
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />
            },
            {
              name: 'Tanstack Query',
              render: <ReactQueryDevtoolsPanel />
            }
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
