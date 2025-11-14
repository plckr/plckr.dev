import { cn } from '~/lib/utils';

import { Button } from '../ui/button';
import { AnimatedNumber } from './animated-number';
import ClapIcon from './claps.svg';
import { ProgressCircle } from './progress-circle';

type Props = {
  count: number;
  progress: number;
  hidden?: boolean;
  onClick?: () => void;
  className?: string;
};

export function ClapsButtonUi({ count, progress, hidden, onClick, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 duration-700 motion-safe:transition-all lg:flex-row lg:gap-3',
        hidden && 'translate-y-4 opacity-0',
        className
      )}
    >
      <AnimatedNumber
        className={cn(
          'bg-background/50 block rounded-sm px-1.5 py-0.5 backdrop-blur-md',
          'text-foreground text-sm font-semibold',
          'pointer-events-none tabular-nums select-none',
          'duration-300 motion-safe:transition-opacity',
          count <= 0 && 'opacity-0'
        )}
      >
        {count}
      </AnimatedNumber>

      <div className="relative isolate size-9">
        <ProgressCircle
          percentage={progress}
          originPosition="bottom"
          className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[#D67D02] dark:text-[#FFC83E]"
        />

        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          aria-label={`Clap for this post. Current claps: ${count}.`}
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
