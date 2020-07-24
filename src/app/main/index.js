import React from 'react';
import LayoutPage from '@components/layouts/layout-page';
import LayoutMain from '@components/layouts/layout-main';
import useInit from '@utils/hooks/use-init';
import documentActions from '@store/document/actions';
import Document from '@containers/document';

function Main() {
  useInit(async () => {
    await documentActions.init({
      path: 'index.md',
    });
  });

  return (
    <LayoutPage>
      <LayoutMain head={<span>React Skeleton</span>}>
        <Document />
      </LayoutMain>
    </LayoutPage>
  );
}

export default React.memo(Main);
