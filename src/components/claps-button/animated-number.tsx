import { HTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react';

const AnimatedNumber = forwardRef<
  HTMLSpanElement,
  Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & { children: number }
>(({ className, children: value, ...props }, ref) => {
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
    <span ref={ref} className={className} {...props}>
      {displayValue}
    </span>
  );
});

AnimatedNumber.displayName = 'AnimatedNumber';

export { AnimatedNumber };
