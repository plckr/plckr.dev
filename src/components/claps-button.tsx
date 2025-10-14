import { usePostClaps } from '~/lib/post-claps';
import { cn, getNextFibonacci } from '~/lib/utils';

import { Button } from './ui/button';

export function ClapsButton({ postSlug }: { postSlug: string }) {
  const claps = usePostClaps(postSlug);

  const currentCount = claps.data?.count ?? 0;
  const sessionCount = claps.data?.sessionCount ?? 0;

  return (
    <Button
      variant="outline"
      className={cn(
        'fixed right-4 bottom-4 duration-700 motion-safe:transition-all',
        claps.isLoading && 'translate-y-4 opacity-0'
      )}
      onClick={() => {
        const nextCount = getNextFibonacci(sessionCount);
        if (nextCount > 13) return;

        claps.updateCount(nextCount);
      }}
    >
      {currentCount} 👏
    </Button>
  );
}
