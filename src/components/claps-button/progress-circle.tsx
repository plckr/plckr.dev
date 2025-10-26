import { forwardRef } from 'react';

const RADIUS = 18;
const DIAMETER = RADIUS * 2;
const STROKE_WIDTH = 2;
const SIZE = DIAMETER + STROKE_WIDTH;
const PERIMETER = DIAMETER * Math.PI;

type Props = {
  originPosition: 'top' | 'bottom' | 'left' | 'right';
  percentage: number;
  className?: string;
};

const ProgressCircle = forwardRef<SVGSVGElement, Props>(
  ({ percentage, originPosition = 'bottom', className }, ref) => {
    const originOffset = {
      right: 0,
      bottom: -0.25,
      left: -0.5,
      top: -0.75
    };

    const strokeOffset = originOffset[originPosition] * PERIMETER;
    const strokeDash = PERIMETER * percentage;
    const strokeGap = PERIMETER - strokeDash;

    return (
      <svg
        ref={ref}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        stroke="currentColor"
        className={className}
      >
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentStroke"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${strokeDash} ${strokeGap}`}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
    );
  }
);

ProgressCircle.displayName = 'ClapsButton__ProgressCircle';

export { ProgressCircle };
