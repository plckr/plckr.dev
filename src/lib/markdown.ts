import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

import { dev } from './constants';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  content: string;
  frontmatter: Record<string, any>;
}

export interface MarkdownOptions {
  customComponents?: Record<string, React.ComponentType<any>>;
}

/**
 * Parse markdown content with frontmatter
 */
export function parseMarkdown(content: string, slug: string): BlogPost {
  const { data: frontmatter, content: markdownContent } = matter(content);

  // Calculate read time (average 200 words per minute)
  const wordCount = markdownContent.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return {
    slug,
    title: frontmatter.title || 'Untitled',
    description: frontmatter.description || '',
    date: frontmatter.date || new Date().toISOString(),
    readTime,
    content: markdownContent,
    frontmatter
  };
}

/**
 * Compile markdown content to MDX
 */
export async function compileMarkdown(
  content: string,
  options: MarkdownOptions = {}
): Promise<string> {
  const { customComponents = {} } = options;

  try {
    const compiled = await compile(content, {
      remarkPlugins: [remarkGfm],
      jsxImportSource: 'react',
      development: dev
    });

    return String(compiled);
  } catch (error) {
    console.error('Error compiling markdown:', error);
    throw new Error('Failed to compile markdown content');
  }
}

/**
 * Get all blog posts from the content directory
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // This will be implemented to read from the file system
  // For now, return empty array
  return [];
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // This will be implemented to read from the file system
  // For now, return null
  return null;
}
