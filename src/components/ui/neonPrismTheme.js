// Custom neon/cyberpunk theme for prism-react-renderer
// Matches the existing aesthetic of the app

const neonTheme = {
  plain: {
    color: '#39ff14',
    backgroundColor: 'transparent',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#64748b',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value', 'template-string'],
      style: {
        color: '#ffb800',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#00f5ff99',
      },
    },
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'constant', 'regex', 'inserted'],
      style: {
        color: '#ff073a',
      },
    },
    {
      types: ['property', 'variable', 'parameter'],
      style: {
        color: '#39ff14',
      },
    },
    {
      types: ['function', 'method', 'function-variable'],
      style: {
        color: '#00f5ff',
      },
    },
    {
      types: ['keyword', 'builtin', 'tag', 'deleted', 'important', 'atrule', 'attr-name'],
      style: {
        color: '#ff00ff',
      },
    },
    {
      types: ['class-name', 'selector'],
      style: {
        color: '#00f5ff',
      },
    },
    {
      types: ['char'],
      style: {
        color: '#ffb800',
      },
    },
  ],
};

export default neonTheme;
