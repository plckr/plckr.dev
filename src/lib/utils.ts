import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sum(...numbers: number[] | number[][]) {
  return numbers.flat().reduce((acc, number) => acc + number, 0);
}
