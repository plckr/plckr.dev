import { usePostClaps } from '~/lib/post-claps';
import { cn, getNextFibonacci } from '~/lib/utils';

import { ClapsButtonUi } from './claps-button-ui';

export function ClapsButton({ postSlug, className }: { postSlug: string; className?: string }) {
  const claps = usePostClaps(postSlug);

  const currentCount = claps.data?.count ?? 0;
  const sessionCount = claps.data?.sessionCount ?? 0;
  const sessionMaxCount = claps.data?.sessionMaxCount ?? 0;

  const handleClick = () => {
    const nextCount = getNextFibonacci(sessionCount);
    if (nextCount > sessionMaxCount) return;

    claps.updateCount(nextCount);
  };

  return (
    <ClapsButtonUi
      count={currentCount}
      progress={sessionCount / sessionMaxCount}
      hidden={claps.isLoading}
      onClick={handleClick}
      className={cn('fixed right-4 bottom-4', className)}
    />
  );
}
