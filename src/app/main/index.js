import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import LayoutPage from '@components/layouts/layout-page';
import LayoutMain from '@components/layouts/layout-main';

import indexPage from '@content/index.md';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import navigation from '@app/navigation';
import 'highlight.js/styles/tomorrow-night-eighties.css';
import '@theme/markdown/styke.css';
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
  html: true
});

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: []  // empty array = all attributes are allowed
});

function Main() {
  const callbacks = {
    onClick: useCallback(e => {
      const name = e.target.attributes.href.value.match(/^\/content\/(.+)\.md$/);
      if (name) {
        e.preventDefault();
        console.log(name[1]);
        navigation.push(`/docs/${name[1]}`);
      }
    }),
  };

  return (
    <LayoutPage>
      <LayoutMain head={<span>React Skeleton</span>}>
        <div
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: md.render(indexPage) }}
          onClick={callbacks.onClick}
        />
        {/*<ul>*/}
        {/*  <li>*/}
        {/*    <Link to="/docs">Документация</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <a*/}
        {/*      href="https://github.com/ylabio/react-skeleton"*/}
        {/*      target="_blank"*/}
        {/*      title="Fork from github.com"*/}
        {/*      rel="noreferrer"*/}
        {/*    >*/}
        {/*      GitHub*/}
        {/*    </a>*/}
        {/*  </li>*/}
        {/*</ul>*/}
      </LayoutMain>
    </LayoutPage>
  );
}

export default React.memo(Main);
