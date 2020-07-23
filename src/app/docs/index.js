import React, {Fragment, useCallback, useEffect, useState} from 'react';
import LayoutContent from '@components/layouts/layout-content';
import HeaderContainer from '@containers/header-container';
import LayoutPage from '@components/layouts/layout-page';
import useInit from '@utils/hooks/use-init';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/tomorrow-night-eighties.css';
import '@theme/markdown/styke.css';
import navigation from '@app/navigation';
import mdAnchor from 'markdown-it-anchor';
import LayoutSide from '@components/layouts/layout-side';
import MenuTree from '@containers/menu-tree';
import menuLeftActions from '@store/menu-left/actions';
import LayoutDoc from '@components/layouts/layout-doc';

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
      } catch (_) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  },
  __html__: true
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
  permalinkBefore: false
});

function Docs(props) {
  const [content, setContent] = useState('content');

  useInit(async () => {
    const page = await import(/* webpackChunkName: "content" */`@content/${props.match.params.page}.md`);
    setContent(page.default);
  }, [props.match.params.page]);

  useInit(async () => {
    await menuLeftActions.load({ fields: '*', limit: 1000 });
  });

  const callbacks = {
    onClick: useCallback((e) => {
      const name = e.target.attributes.href.value.match(/^\/content\/(.+)\.md$/);
      if (name) {
        e.preventDefault();
        console.log(name[1]);
        navigation.push(`/docs/${name[1]}`);
      }
    })
  }

  return (
    <LayoutDoc side={<MenuTree />}>
      <LayoutContent>
        <div className="markdown-body" dangerouslySetInnerHTML={{__html:md.render(content)}} onClick={callbacks.onClick} />
      </LayoutContent>
    </LayoutDoc>
  );
}

export default React.memo(Docs);
