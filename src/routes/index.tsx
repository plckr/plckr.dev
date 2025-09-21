import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App
});

function App() {
  return (
    <>
      <header className="bg-background mx-auto w-full px-4 sm:max-w-screen-lg sm:px-6 lg:px-8">
        <div className="fade flex w-full flex-col items-center justify-start py-8 tracking-tight sm:pr-0 md:items-start md:pr-6 lg:pr-0">
          <div className="flex items-center gap-4">
            <Avatar>
              <a href="https://github.com/plckr/" target="_blank" rel="noopener noreferrer">
                <AvatarImage src="https://avatars.githubusercontent.com/u/11768109" />
                <AvatarFallback>RR</AvatarFallback>
              </a>
            </Avatar>

            <div>
              <p className="text-medium inline-block font-medium">Ricardo Reis</p>
              <p className="opacity-60">full stack engineer</p>
            </div>
          </div>

          <nav className="mt-8 mb-0 flex w-full flex-row items-center justify-between gap-2 tracking-tight sm:mt-4 sm:mb-4 sm:justify-end">
            <div className="inline-flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/">about</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/">blog</Link>
              </Button>
            </div>

            <ThemeToggle variant="ghost" />
          </nav>
        </div>
      </header>

      <section className="bg-background prose-zinc dark:prose-invert animate-enter container mx-auto w-full px-4 text-zinc-800 sm:max-w-screen-lg sm:px-6 lg:px-8 dark:text-zinc-200">
        <p className="my-5 text-zinc-800 dark:text-zinc-200">Hi, I'm Ricardo.</p>

        <p>
          I'm pretty much into tech and always on the lookout for new stuff to learn. My background
          focus most on front-end but I'm also into back-end, I'm also keen on picking up new skills
          and applying them the right way. Excited to join a team that loves innovation and is
          always aiming to improve.
        </p>
      </section>
    </>
  );
}
