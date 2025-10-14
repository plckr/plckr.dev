import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sum(...numbers: number[] | number[][]) {
  return numbers.flat().reduce((acc, number) => acc + number, 0);
}

export function getNextFibonacci(current: number): number {
  if (current < 0) throw new Error('Provided number cannot be negative');

  let prev = 0;
  let curr = 1;

  while (curr <= current) {
    const next = curr;
    curr = prev + curr;
    prev = next;
  }

  return curr;
}
