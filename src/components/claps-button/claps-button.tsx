import { usePostClaps } from '~/lib/post-claps';
import { cn, getNextFibonacci } from '~/lib/utils';

import { Button } from '../ui/button';
import { AnimatedNumber } from './animated-number';
import ClapIcon from './claps.svg';

export function ClapsButton({ postSlug, className }: { postSlug: string; className?: string }) {
  const claps = usePostClaps(postSlug);

  const currentCount = claps.data?.count ?? 0;
  const sessionCount = claps.data?.sessionCount ?? 0;
  const sessionMaxCount = claps.data?.sessionMaxCount ?? 0;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = (sessionCount / sessionMaxCount) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleClick = () => {
    const nextCount = getNextFibonacci(sessionCount);
    if (nextCount > sessionMaxCount) return;

    claps.updateCount(nextCount);
  };

  return (
    <div
      className={cn(
        'fixed right-4 bottom-4 flex flex-col items-center gap-2 duration-700 motion-safe:transition-all lg:flex-row lg:gap-3',
        claps.isLoading && 'translate-y-4 opacity-0',
        className
      )}
    >
      <AnimatedNumber
        className={cn(
          'bg-background/50 block rounded-sm px-1.5 py-0.5 backdrop-blur-md',
          'text-foreground text-sm font-semibold',
          'pointer-events-none tabular-nums select-none',
          'duration-300 motion-safe:transition-opacity',
          currentCount <= 0 && 'opacity-0'
        )}
      >
        {currentCount}
      </AnimatedNumber>

      <div className="relative isolate size-9">
        <svg
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rotate-90"
          width="38"
          height="38"
          viewBox="0 0 42 42"
        >
          <circle
            cx="21"
            cy="21"
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-[#D67D02] transition-all duration-500 ease-out dark:text-[#FFC83E]"
            strokeLinecap="round"
          />
        </svg>

        <Button
          variant="outline"
          size="icon"
          onClick={handleClick}
          aria-label={`Clap for this post. Current claps: ${currentCount}. Your session claps: ${sessionCount}`}
          className={cn(
            'relative size-9 rounded-full',
            'transition-all duration-200',
            'hover:scale-105 hover:shadow-lg',
            'active:scale-90',
            'before:bg-background before:absolute before:-inset-0.5 before:rounded-full'
          )}
        >
          <ClapIcon className="relative z-10 size-6" />
        </Button>
      </div>
    </div>
  );
}
