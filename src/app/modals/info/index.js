import React, { Fragment, useCallback } from 'react';
import modal from '@store/modal/actions';
import LayoutModal from '@components/layouts/layout-modal';

function Info(props) {
  const callbacks = {
    onCancel: useCallback(async () => {
      await modal.close('Cancel value');
    }, []),
    onSuccess: useCallback(async () => {
      await modal.close('Success value');
    }, []),
    renderFooter: useCallback(() => {
      return (
        <Fragment>
          <button onClick={callbacks.onSuccess}>Всё понятно</button>
        </Fragment>
      );
    }, []),
  };

  return (
    <LayoutModal
      onClose={callbacks.onCancel}
      footer={callbacks.renderFooter()}
      overflowTransparent={props.overflowTransparent}
      overflowClose={props.overflowClose}
    >
      Модальное окно
    </LayoutModal>
  );
}

export default React.memo(Info);
