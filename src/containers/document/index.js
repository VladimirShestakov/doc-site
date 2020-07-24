import React, { useCallback } from 'react';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-eighties.css';
import '@theme/markdown/styke.css';
import navigation from '@app/navigation';
import mdAnchor from 'markdown-it-anchor';
import useSelectorMap from '@utils/hooks/use-selector-map';
import markdownItAttrs from '@gerhobbelt/markdown-it-attrs';

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
  __html__: true,
});

md.use(mdAnchor, {
  level: 1,
  slugify: string => string,
  permalink: true,
  // renderPermalink: (slug, opts, state, permalink) => {
  //   state.tokens[permalink + 1].children.push(Object.assign(new state.Token('text', '', 0), { content: ' ! ' }));
  // },
  permalinkClass: 'header-anchor',
  permalinkSymbol: '¶',
  permalinkBefore: false,
});

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: [], // empty array = all attributes are allowed
});

function Document(props) {
  const select = useSelectorMap(state => ({
    data: state.document.data,
    wait: state.document.wait,
  }));

  const callbacks = {
    onClick: useCallback(e => {
      const url = e.target.closest('a').attributes.href.value || '';
      if (!url.match(/^http/)) {
        e.preventDefault();
        e.stopPropagation();
        navigation.push(url);
      }
    }),
  };

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: md.render(select.data) }}
      onClick={callbacks.onClick}
    />
  );
}

export default React.memo(Document);
