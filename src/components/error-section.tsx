import { Link } from '@tanstack/react-router';
import { ComponentProps } from 'react';

import { Button } from './ui/button';
import { Icon } from './ui/icon';

export default function ErrorSection({
  statusCode,
  description,
  backButton
}: {
  statusCode: number;
  description: string;
  backButton?: {
    to: ComponentProps<typeof Link>['to'];
    title: string;
  };
}) {
  return (
    <section>
      <h1 className="text-foreground/50 tracking-wide">{statusCode}</h1>
      <p className="text-2xl font-medium">{description}</p>
      {backButton && (
        <Button variant="default" asChild className="mt-6">
          <Link to={backButton.to}>
            <Icon.ArrowLeft /> {backButton.title}
          </Link>
        </Button>
      )}
    </section>
  );
}
