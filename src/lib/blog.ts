import { type BlogPost, parseMarkdown } from './markdown';

// In a real implementation, this would read from the file system
// For now, we'll use static data
const SAMPLE_POSTS: Record<string, string> = {
  'sample-post': `---
title: "Getting Started with Markdown Rendering"
description: "Learn how to implement markdown rendering with custom components in your React application."
date: "2024-01-15"
tags: ["markdown", "react", "tutorial"]
---

# Getting Started with Markdown Rendering

This is a sample blog post demonstrating the markdown rendering capabilities with custom components.

## Features

Our markdown renderer supports:

- **Bold text** and *italic text*
- \`Inline code\` and code blocks
- [Links](https://example.com)
- Lists and tables
- Custom React components

<Callout type="info">
This is a custom callout component that can be used in your markdown!
</Callout>

## Code Examples

Here's a simple React component:

<CodeBlock language="tsx" title="Example Component">
\`\`\`tsx
import React from 'react';

export function MyComponent() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
\`\`\`
</CodeBlock>

## Interactive Demo

<Demo title="Try it out">
<Button>Click me!</Button>
</Demo>

## Conclusion

This markdown renderer provides a powerful way to create rich blog posts with custom components while maintaining the simplicity of markdown syntax.`
};

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return Object.entries(SAMPLE_POSTS).map(([slug, content]) => {
    return parseMarkdown(content, slug);
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const content = SAMPLE_POSTS[slug];
  if (!content) return null;

  return parseMarkdown(content, slug);
}
