import React from 'react';
import LayoutContent from '@components/layouts/layout-content';
import useInit from '@utils/hooks/use-init';
import LayoutDoc from '@components/layouts/layout-doc';
import MenuTree from '@containers/menu-tree';
import Document from '@containers/document';
import menuLeftActions from '@store/menu-left/actions';
import documentActions from '@store/document/actions';

function Docs(props) {
  useInit(async () => {
    await documentActions.init({
      path: `docs/${props.match.params.page || 'index.md'}`,
    });
  }, [props.match.params.page]);

  useInit(async () => {
    await menuLeftActions.load({ fields: '*', limit: 1000 });
  });

  return (
    <LayoutDoc side={<MenuTree />}>
      <LayoutContent>
        <Document />
      </LayoutContent>
    </LayoutDoc>
  );
}

export default React.memo(Docs);
