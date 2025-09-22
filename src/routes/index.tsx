import { ThemeToggle } from '@/components/theme-toggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App
});

function App() {
  return (
    <>
      <header className="flex flex-col items-start justify-start py-8">
        <div className="flex items-center gap-4 pl-4 sm:pl-0">
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

        <nav className="mt-8 flex w-full items-center justify-between gap-2 sm:my-4 sm:justify-end">
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
      </header>

      <section className="py-5 text-base/relaxed text-zinc-800 dark:text-zinc-200">
        <p className="text-zinc-800 dark:text-zinc-200">Hi, I'm Ricardo.</p>

        <p className="mt-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent hendrerit pretium enim
          nec pharetra. Donec nec nibh sed urna vehicula fringilla eu eu nunc. Pellentesque tempus,
          lectus a eleifend varius, justo leo tempus nunc, vestibulum rhoncus mi ligula vitae mi.
          Pellentesque diam mi, feugiat vitae consequat ut, efficitur non eros.
        </p>

        <hr className="my-8" />

        <p className="my-5 text-zinc-800 dark:text-zinc-200">
          Proin condimentum, est nec sagittis fermentum, ex magna lacinia turpis, vitae aliquam
          tortor odio lobortis dui. Maecenas enim mi, laoreet placerat elementum pulvinar, congue
          vel sapien. Sed aliquet odio sit amet risus cursus, et commodo nisl consequat.
        </p>
      </section>

      <footer className="mt-4 flex gap-4">
        <Button variant="outline" asChild>
          <a href="https://github.com/plckr/" target="_blank" rel="noopener noreferrer">
            <Icon.Github />
            Github
            <Icon.ExternalLink className="ml-4" />
          </a>
        </Button>

        <Button variant="outline" asChild>
          <a
            href="https://www.linkedin.com/in/ricardoreis2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon.Linkedin />
            Linkedin
            <Icon.ExternalLink className="ml-4" />
          </a>
        </Button>
      </footer>
    </>
  );
}
