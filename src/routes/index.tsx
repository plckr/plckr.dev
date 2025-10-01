import { createFileRoute } from '@tanstack/react-router';

import GithubActivity from '~/components/github-activity';
import { Button } from '~/components/ui/button';
import { Icon } from '~/components/ui/icon';
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL } from '~/lib/constants';
import { createHomepageSEO, createSEOHead } from '~/lib/seo';

export const Route = createFileRoute('/')({
  component: App,
  head: () => {
    const seoConfig = createHomepageSEO();
    const { meta, links } = createSEOHead(seoConfig);

    return {
      meta,
      links
    };
  }
});

function App() {
  return (
    <>
      <section className="text-base/relaxed">
        <p>Hi, I'm Ricardo.</p>

        <p className="mt-5">
          I'm pretty much into tech and always on the lookout for new stuff to learn. My background
          focus mostly on front-end but I'm also into back-end, I'm also keen on picking up new
          skills and applying them the right way. Excited to join a team that loves innovation and
          is always aiming to improve.
        </p>
      </section>

      <footer className="mt-9">
        <section>
          <GithubActivity />
        </section>

        <section className="mt-6 flex gap-4">
          <Button variant="outline" asChild>
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              <Icon.Github />
              Github
              <Icon.ExternalLink className="ml-4" />
            </a>
          </Button>

          <Button variant="outline" asChild>
            <a href={LINKEDIN_PROFILE_URL} target="_blank" rel="noopener noreferrer">
              <Icon.Linkedin />
              Linkedin
              <Icon.ExternalLink className="ml-4" />
            </a>
          </Button>
        </section>
      </footer>
    </>
  );
}
