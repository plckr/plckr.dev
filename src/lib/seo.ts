import { dev } from './constants';

export interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  readingTime?: number;
  siteName?: string;
  locale?: string;
  alternateLocales?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  canonical?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
}

export interface SEOHeadReturn {
  meta: Array<{
    name?: string;
    property?: string;
    content?: string;
    charSet?: string;
    title?: string;
    rel?: string;
    href?: string;
  }>;
  links: Array<{ rel: string; href: string; type?: string; sizes?: string; hreflang?: string }>;
}

const DEFAULT_CONFIG: Required<
  Pick<SEOConfig, 'siteName' | 'author' | 'locale' | 'twitterCard' | 'ogType'>
> = {
  siteName: 'Ricardo Reis',
  author: 'Ricardo Reis',
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  ogType: 'website'
};

const BASE_URL = dev ? 'http://localhost:3000' : 'https://plckr.dev';

/**
 * Creates comprehensive SEO meta tags and links for TanStack Router
 */
export function createSEOHead(config: SEOConfig = {}): SEOHeadReturn {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };

  const meta: Array<{
    name?: string;
    property?: string;
    content?: string;
    charSet?: string;
    title?: string;
    rel?: string;
    href?: string;
  }> = [];
  const links: Array<{
    rel: string;
    href: string;
    type?: string;
    sizes?: string;
    hreflang?: string;
  }> = [];

  // Basic meta tags
  meta.push({ charSet: 'utf-8' });
  meta.push({ name: 'viewport', content: 'width=device-width, initial-scale=1' });

  // Title
  if (mergedConfig.title) {
    const fullTitle = mergedConfig.title.includes(mergedConfig.siteName)
      ? mergedConfig.title
      : `${mergedConfig.title} | ${mergedConfig.siteName}`;
    meta.push({ title: fullTitle });
  }

  // Description
  if (mergedConfig.description) {
    meta.push({ name: 'description', content: mergedConfig.description });
  }

  // Keywords
  if (mergedConfig.keywords && mergedConfig.keywords.length > 0) {
    meta.push({ name: 'keywords', content: mergedConfig.keywords.join(', ') });
  }

  // Author
  meta.push({ name: 'author', content: mergedConfig.author });

  // Robots
  const robots = [];
  if (mergedConfig.noindex) robots.push('noindex');
  if (mergedConfig.nofollow) robots.push('nofollow');
  if (robots.length === 0) robots.push('index', 'follow');
  meta.push({ name: 'robots', content: robots.join(', ') });

  // Open Graph tags
  meta.push({ property: 'og:type', content: mergedConfig.ogType });
  meta.push({ property: 'og:site_name', content: mergedConfig.siteName });
  meta.push({ property: 'og:locale', content: mergedConfig.locale });

  if (mergedConfig.title) {
    meta.push({ property: 'og:title', content: mergedConfig.title });
  }

  if (mergedConfig.description) {
    meta.push({ property: 'og:description', content: mergedConfig.description });
  }

  if (mergedConfig.url) {
    meta.push({ property: 'og:url', content: mergedConfig.url });
  }

  if (mergedConfig.image) {
    meta.push({ property: 'og:image', content: mergedConfig.image });
    if (mergedConfig.ogImageWidth) {
      meta.push({ property: 'og:image:width', content: mergedConfig.ogImageWidth.toString() });
    }
    if (mergedConfig.ogImageHeight) {
      meta.push({ property: 'og:image:height', content: mergedConfig.ogImageHeight.toString() });
    }
    if (mergedConfig.ogImageAlt) {
      meta.push({ property: 'og:image:alt', content: mergedConfig.ogImageAlt });
    }
  }

  // Article specific tags
  if (mergedConfig.type === 'article') {
    if (mergedConfig.publishedTime) {
      meta.push({ property: 'article:published_time', content: mergedConfig.publishedTime });
    }
    if (mergedConfig.modifiedTime) {
      meta.push({ property: 'article:modified_time', content: mergedConfig.modifiedTime });
    }
    if (mergedConfig.author) {
      meta.push({ property: 'article:author', content: mergedConfig.author });
    }
    if (mergedConfig.section) {
      meta.push({ property: 'article:section', content: mergedConfig.section });
    }
    if (mergedConfig.tags && mergedConfig.tags.length > 0) {
      mergedConfig.tags.forEach((tag) => {
        meta.push({ property: 'article:tag', content: tag });
      });
    }
  }

  // Twitter Card tags
  meta.push({ name: 'twitter:card', content: mergedConfig.twitterCard });

  if (mergedConfig.twitterSite) {
    meta.push({ name: 'twitter:site', content: mergedConfig.twitterSite });
  }

  if (mergedConfig.twitterCreator) {
    meta.push({ name: 'twitter:creator', content: mergedConfig.twitterCreator });
  }

  if (mergedConfig.title) {
    meta.push({ name: 'twitter:title', content: mergedConfig.title });
  }

  if (mergedConfig.description) {
    meta.push({ name: 'twitter:description', content: mergedConfig.description });
  }

  if (mergedConfig.url) {
    meta.push({ name: 'twitter:url', content: mergedConfig.url });
  }

  if (mergedConfig.image) {
    meta.push({ name: 'twitter:image', content: mergedConfig.image });
    if (mergedConfig.ogImageAlt) {
      meta.push({ name: 'twitter:image:alt', content: mergedConfig.ogImageAlt });
    }
  }

  // Canonical URL
  if (mergedConfig.canonical) {
    links.push({ rel: 'canonical', href: mergedConfig.canonical });
  } else if (mergedConfig.url) {
    links.push({ rel: 'canonical', href: mergedConfig.url });
  }

  // Alternate locales
  if (mergedConfig.alternateLocales && mergedConfig.alternateLocales.length > 0) {
    mergedConfig.alternateLocales.forEach((locale) => {
      links.push({ rel: 'alternate', href: `${BASE_URL}/${locale}`, hreflang: locale });
    });
  }

  return { meta, links };
}

/**
 * Creates SEO config for the homepage
 */
export function createHomepageSEO(): SEOConfig {
  return {
    title: 'Ricardo Reis',
    description:
      "Hi, I'm Ricardo. I'm pretty much into tech and always on the lookout for new stuff to learn. My background focus mostly on front-end but I'm also into back-end, I'm also keen on picking up new skills and applying them the right way.",
    keywords: [
      'Ricardo Reis',
      'Frontend Developer',
      'Full Stack Developer',
      'React',
      'TypeScript',
      'Web Development'
    ],
    type: 'profile',
    url: BASE_URL,
    image: `${BASE_URL}/og-image.jpg`
  };
}

/**
 * Creates SEO config for blog listing page
 */
export function createBlogListSEO(): SEOConfig {
  return {
    title: 'Blog',
    description: 'Thoughts and insights on web development, technology, and software engineering.',
    keywords: [
      'Blog',
      'Web Development',
      'Technology',
      'Software Engineering',
      'React',
      'TypeScript'
    ],
    type: 'website',
    url: `${BASE_URL}/blog`,
    image: `${BASE_URL}/og-image.jpg`
  };
}

/**
 * Creates SEO config for individual blog posts
 */
export function createBlogPostSEO(post: {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  thumbnail?: { src: string; width?: number; height?: number };
  tags?: string[];
  readingTime?: number;
}): SEOConfig {
  const publishedTime = new Date(post.date).toISOString();
  const imageUrl = post.thumbnail?.src
    ? `${BASE_URL}${post.thumbnail.src}`
    : `${BASE_URL}/og-blog.jpg`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ['Blog', 'Web Development', 'Technology', ...(post.tags || [])],
    type: 'article',
    url: `${BASE_URL}/blog/${post.slug}`,
    image: imageUrl,
    publishedTime,
    modifiedTime: publishedTime,
    section: 'Technology',
    tags: post.tags,
    readingTime: post.readingTime,
    ogImageWidth: post.thumbnail?.width,
    ogImageHeight: post.thumbnail?.height,
    ogImageAlt: post.title
  };
}

/**
 * Creates SEO config for 404 pages
 */
export function create404SEO(): SEOConfig {
  return {
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    noindex: true,
    type: 'website'
  };
}
