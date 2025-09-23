import React from 'react';

import { MDXRenderer } from './MDXRenderer';

export interface MarkdownContentProps {
  content: string;
  customComponents?: Record<string, React.ComponentType<any>>;
  className?: string;
}

export function MarkdownContent({ content, customComponents, className }: MarkdownContentProps) {
  return (
    <MDXRenderer content={content} customComponents={customComponents} className={className} />
  );
}
