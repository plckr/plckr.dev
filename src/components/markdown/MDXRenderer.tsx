import { cn } from '@/lib/utils';
import { useMDXComponents } from '@mdx-js/react';
import React from 'react';

export interface MDXRendererProps {
  content: string;
  customComponents?: Record<string, React.ComponentType<any>>;
  className?: string;
}

export function MDXRenderer({ content, customComponents = {}, className }: MDXRendererProps) {
  const components = useMDXComponents({
    // Default components with custom styling
    h1: ({ children, ...props }) => (
      <h1
        className="mt-8 mb-6 text-4xl font-bold tracking-tight text-zinc-800 first:mt-0 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="mt-8 mb-4 text-3xl font-semibold tracking-tight text-zinc-800 first:mt-0 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="mt-6 mb-3 text-2xl font-semibold tracking-tight text-zinc-800 first:mt-0 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="mt-4 mb-2 text-xl font-semibold tracking-tight text-zinc-800 first:mt-0 dark:text-zinc-100"
        {...props}
      >
        {children}
      </h4>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400" {...props}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-blue-600 underline decoration-blue-300 underline-offset-2 transition-all hover:text-blue-800 hover:underline-offset-4 dark:text-blue-400 dark:decoration-blue-600 dark:hover:text-blue-300"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul
        className="mb-4 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400"
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol
        className="mb-4 list-inside list-decimal space-y-1 text-zinc-600 dark:text-zinc-400"
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="mb-4 border-l-4 border-zinc-300 bg-zinc-50 py-2 pl-4 text-zinc-600 italic dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
        {...props}
      >
        {children}
      </code>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100 dark:bg-zinc-950"
        {...props}
      >
        {children}
      </pre>
    ),
    hr: ({ ...props }) => (
      <hr className="my-8 border-0 border-t border-zinc-200 dark:border-zinc-700" {...props} />
    ),
    table: ({ children, ...props }) => (
      <div className="mb-4 overflow-x-auto">
        <table
          className="min-w-full border-collapse border border-zinc-200 dark:border-zinc-700"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-zinc-50 dark:bg-zinc-800" {...props}>
        {children}
      </thead>
    ),
    th: ({ children, ...props }) => (
      <th
        className="border border-zinc-200 px-4 py-2 text-left font-semibold text-zinc-800 dark:border-zinc-700 dark:text-zinc-200"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td
        className="border border-zinc-200 px-4 py-2 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
        {...props}
      >
        {children}
      </td>
    ),
    // Merge custom components
    ...customComponents
  });

  // This is a placeholder - in a real implementation, you'd need to evaluate the MDX content
  // For now, we'll return a div with the content as a string
  // In practice, you'd use a dynamic import or server-side compilation
  return (
    <div className={cn('prose prose-zinc dark:prose-invert max-w-none', className)}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
