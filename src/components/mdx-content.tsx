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

const sharedComponents = {
  img: (props: { src: string; alt: string }) => {
    return (
      <ImageZoom className="not-prose my-8">
        <img {...props} className="scale-105 rounded-lg" />
      </ImageZoom>
    );
  },
  pre: ({ children }: { children: React.ReactNode }) => {
    return <pre className="not-prose">{children}</pre>;
  },
  code: (props: { className: string; children: string }) => {
    const code = props.children;

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
  return <Component components={{ ...sharedComponents, ...components }} />;
};
