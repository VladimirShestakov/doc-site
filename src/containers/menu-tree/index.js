import React from 'react';
import useSelectorMap from '@utils/hooks/use-selector-map';
import { Link } from 'react-router-dom';
import Tree from '@components/elements/tree';

function MenuTree(props) {
  const select = useSelectorMap(state => ({
    //items: state.menuLeft.items,
    roots: state.menuLeft.roots,
    wait: state.menuLeft.wait,
  }));

  if (select.wait) {
    return <div>{select.wait && <i>Загрузка...</i>}</div>;
  } else {
    return (
      <Tree
        items={select.roots.length ? select.roots : []}
        renderItem={item => <Link to={`/docs/${item.url}`}>{item.title}</Link>}
      />
    );
  }
}

export default React.memo(MenuTree);
