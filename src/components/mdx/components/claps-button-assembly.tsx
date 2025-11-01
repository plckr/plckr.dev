import { useState } from 'react';

import { AnimatedNumber } from '~/components/claps-button/animated-number';
import ClapsIcon from '~/components/claps-button/claps.svg';
import { ProgressCircle } from '~/components/claps-button/progress-circle';
import { Button } from '~/components/ui/button';
import { cn, getNextFibonacci } from '~/lib/utils';

export function ClapsButtonAssembly() {
  const [count, setCount] = useState(3);
  const [assembled, setAssembled] = useState(true);

  const maxCount = 13;

  const increaseCount = () => {
    const nextCount = getNextFibonacci(count);
    if (nextCount > maxCount) {
      setCount(0);
    } else {
      setCount(nextCount);
    }
  };

  return (
    <div className="border-border relative my-5 grid place-items-center rounded-lg border py-20 shadow-sm">
      <div className="absolute top-5 left-5 flex gap-2">
        <Button variant="outline" onClick={() => setAssembled(!assembled)}>
          {assembled ? 'Disassemble' : 'Assemble'}
        </Button>
        <Button variant="outline" onClick={increaseCount}>
          {count >= maxCount ? 'Reset count' : 'Increase count'}
        </Button>
      </div>
      <div className="duration-700 motion-safe:transition-all">
        <div className="relative flex items-center">
          <AnimatedNumber
            className={cn(
              'bg-background/50 block rounded-sm px-1.5 py-0.5 backdrop-blur-md',
              'text-foreground text-sm font-semibold',
              'pointer-events-none tabular-nums select-none',
              'duration-300 motion-safe:transition-all',
              'absolute inset-y-auto left-0 -ml-2 -translate-x-full lg:-ml-3',
              !assembled && '-translate-x-16'
            )}
          >
            {count}
          </AnimatedNumber>

          <div className="relative isolate size-9">
            <ProgressCircle
              originPosition="bottom"
              percentage={count / maxCount}
              className={cn(
                'pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[#D67D02] motion-safe:transition-all dark:text-[#FFC83E]'
              )}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={increaseCount}
              aria-label={`Clap for this post. Current claps: ${count}.`}
              className={cn(
                'relative size-9 rounded-full',
                'transition-all duration-200',
                'hover:scale-105 hover:shadow-lg',
                'active:scale-90',
                'before:bg-background before:absolute before:-inset-0.5 before:rounded-full',
                'motion-safe:transition-all',
                !assembled && 'translate-x-20'
              )}
            >
              <ClapsIcon className="relative z-10 size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
