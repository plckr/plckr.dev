import { stat } from 'fs/promises';
import { defineConfig, defineSchema, s } from 'velite';

const timestamp = defineSchema(() =>
  s
    .custom<string | undefined>((i) => i === undefined || typeof i === 'string')
    .transform<string>(async (value, { meta, addIssue }) => {
      if (value != null) {
        addIssue({
          fatal: false,
          code: 'custom',
          message: '`s.timestamp()` schema will resolve the file modified timestamp'
        });
      }

      const stats = await stat(meta.path as string);
      return stats.mtime.toISOString();
    })
);

export default defineConfig({
  root: './posts',
  collections: {
    posts: {
      name: 'Post',
      pattern: '*.md',
      schema: s.object({
        slug: s.path(),

        title: s.string(),
        excerpt: s.string(),
        date: s.isodate(),

        lastModified: timestamp(),
        metadata: s.metadata(),
        content: s.markdown()
      })
    }
  }
});
