import { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { usePostClaps } from '~/lib/post-claps';
import { cn, getNextFibonacci } from '~/lib/utils';

import { Button } from './ui/button';

function ClapIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10.8903 20.8775C9.22578 20.8775 8.11609 19.7678 7.56125 18.6581L5.34187 14.2194C4.78703 13.1097 5.34187 12 6.45156 12C7.13478 12 8.11954 12 8.7526 13.2516L9.78062 15.3291V7.56126C9.78062 6.45157 10.3355 5.89673 11.4452 5.89673C12.5548 5.89673 13.1097 6.45157 13.1097 7.56126V10.8903"
        fill="#FFC83E"
      />
      <path
        d="M13.1097 10.8903V7.56126C13.1097 6.45157 13.6645 5.89673 14.7742 5.89673C15.8839 5.89673 16.4387 6.45157 16.4387 7.56126V8.67095V10.8903"
        fill="#FFC83E"
      />
      <path
        d="M16.4387 10.8903V8.67095C16.4387 7.56126 16.9936 7.00642 18.1033 7.00642C19.213 7.00642 19.7678 7.56126 19.7678 8.67095V14.2194C19.7678 17.5484 17.5484 20.8775 14.2194 20.8775H10.8903"
        fill="#FFC83E"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.56125 18.6581C8.11609 19.7678 9.22578 20.8775 10.8903 20.8775H14.2194C17.5484 20.8775 19.7678 17.5484 19.7678 14.2194V8.67095C19.7678 7.56126 19.213 7.00642 18.1033 7.00642C16.9936 7.00642 16.4387 7.56126 16.4387 8.67095V7.56126C16.4387 6.45157 15.8839 5.89673 14.7742 5.89673C13.6645 5.89673 13.1097 6.45157 13.1097 7.56126C13.1097 6.45157 12.5548 5.89673 11.4452 5.89673C10.3355 5.89673 9.78062 6.45157 9.78062 7.56126V15.3291L8.7526 13.2516C8.11954 12 7.13478 12 6.45156 12C5.34187 12 4.78703 13.1097 5.34187 14.2194L7.56125 18.6581Z"
        fill="#FFC83E"
      />
      <path
        d="M13.1097 7.56126C13.1097 6.45157 12.5548 5.89673 11.4452 5.89673C10.3355 5.89673 9.78062 6.45157 9.78062 7.56126V15.3291L8.7526 13.2516C8.11954 12 7.13478 12 6.45156 12C5.34187 12 4.78703 13.1097 5.34187 14.2194L7.56125 18.6581C8.11609 19.7678 9.22578 20.8775 10.8903 20.8775H14.2194C17.5484 20.8775 19.7678 17.5484 19.7678 14.2194V8.67095C19.7678 7.56126 19.213 7.00642 18.1033 7.00642C16.9936 7.00642 16.4387 7.56126 16.4387 8.67095M13.1097 7.56126V10.8903M13.1097 7.56126C13.1097 6.45157 13.6645 5.89673 14.7742 5.89673C15.8839 5.89673 16.4387 6.45157 16.4387 7.56126V8.67095M16.4387 8.67095V10.8903"
        stroke="#D67D02"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M5.34188 4.23218L4.23219 6.45155" stroke="#47A4FB" stroke-linecap="round" />
      <path d="M8.67095 3.1225L8.1161 5.34187" stroke="#47A4FB" stroke-linecap="round" />
      <path d="M12 3.1225L12.5548 5.34187" stroke="#47A4FB" stroke-linecap="round" />
    </svg>
  );
}

function AnimatedNumber({
  className,
  children: value,
  ...props
}: Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { children: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const prevValue = prevValueRef.current;
    if (prevValue === value) return;

    const durationMs = 400;
    const steps = 20;
    const stepDuration = durationMs / steps;
    const increment = (value - prevValue) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(prevValue + increment * currentStep));
      }
    }, stepDuration);

    prevValueRef.current = value;

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className} {...props}>
      {displayValue}
    </span>
  );
}

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
