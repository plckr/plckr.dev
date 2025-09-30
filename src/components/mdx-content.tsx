import { Link } from '@tanstack/react-router';
import * as runtime from 'react/jsx-runtime';

import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockItem
} from './ui/kibo-ui/code-block';
import { ImageZoom } from './ui/kibo-ui/image-zoom';

type MarkdownComponentsProps = {
  a: { href: string; children: string };
  img: { src: string; alt: string };
  pre: { children: string };
  code: { className: string; children: string };
};
type MarkdownComponents = keyof MarkdownComponentsProps;

const markdownComponents: {
  [K in MarkdownComponents]: (props: MarkdownComponentsProps[K]) => React.ReactNode;
} = {
  a: ({ children, href }) => {
    if (href.startsWith('/')) {
      return <Link to={href}>{children}</Link>;
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
  img: (props) => {
    return (
      <ImageZoom className="not-prose my-8 sm:px-2">
        <img {...props} className="mx-auto rounded-lg" />
      </ImageZoom>
    );
  },
  pre: ({ children }) => {
    return <pre>{children}</pre>;
  },
  code: (props) => {
    const code = props.children.replace(/\n$/, '');

    // For inline code style
    if (code.split('\n').length === 1) {
      return (
        <code className="not-prose bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {code}
        </code>
      );
    }

    // For multi-line code style
    const language = props.className?.split('language-')[1] ?? 'plaintext';

    return (
      <CodeBlock
        data-code-block
        data={[{ filename: '', language, code }]}
        defaultValue={language}
        className="not-prose group"
      >
        <CodeBlockBody className="relative">
          {(item) => (
            <CodeBlockItem key={item.language} value={item.language}>
              <CodeBlockContent language={item.language as BundledLanguage}>
                {item.code}
              </CodeBlockContent>
              <CodeBlockCopyButton className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100" />
            </CodeBlockItem>
          )}
        </CodeBlockBody>
      </CodeBlock>
    );
  }
};

const sharedComponents: Record<string, (props: any) => React.ReactNode> = {
  // To add shared components
};

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...markdownComponents, ...sharedComponents, ...components }} />;
};
