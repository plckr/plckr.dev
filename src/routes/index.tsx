import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App
});

function App() {
  return (
    <>
      <section className="text-base/relaxed text-zinc-800 dark:text-zinc-200">
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

      <footer className="mt-9 flex gap-4">
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
