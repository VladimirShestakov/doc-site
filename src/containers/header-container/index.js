import React, { useMemo, useCallback } from 'react';
import detectActive from '@utils/detect-active';
import LayoutHeader from '@components/layouts/layout-header';
import MenuTop from '@components/menus/menu-top';
import Logo from '@components/elements/logo';
import useSelectorMap from '@utils/hooks/use-selector-map';
import { useHistory, useLocation } from 'react-router-dom';
import Button from '@components/elements/button';

function HeaderContainer() {
  const select = useSelectorMap(state => ({
    session: state.session,
  }));

  const history = useHistory();
  const location = useLocation();

  const callbacks = {
    onClickLogin: useCallback(() => {
      history.push('/login');
    }, []),
    onClickRegistration: useCallback(() => {
      history.push('/registration');
    }, []),
    onClickLogout: useCallback(() => {
      //actions.session.clear();
    }, []),
  };

  const options = {
    links: useMemo(
      () =>
        detectActive(
          [
            { title: 'Главная', to: '/', active: false },
            { title: 'Дока', to: '/docs/index', active: false },
            { title: 'Новый проект', to: '/docs/1-new-project', active: false },
            { title: 'Структура', to: '/docs/2-structure', active: false },
            // { title: 'Каталог', to: '/catalog', active: false },
            // { title: 'Админка', to: '/private', active: false },
          ],
          location,
        ),
      [location],
    ),
  };

  const renders = {
    right: useMemo(() => {
      const items = [];

      if (select.session.exists) {
        items.push(
          <Button key={1} type={'primary'} onClick={callbacks.onClickLogout}>
            Выход
          </Button>,
        );
      } else {
        items.push(
          <Button key={1} type={'primary'} onClick={callbacks.onClickLogin}>
            Войти
          </Button>,
          <Button key={2} type={'primary'} onClick={callbacks.onClickRegistration}>
            Регистрация
          </Button>,
        );
      }

      return items;
    }, [select.session.exists]),
  };

  return (
    <LayoutHeader
      left={<Logo theme={'black'} />}
      right={renders.right}
      center={<MenuTop items={options.links} />}
    />
  );
}

export default React.memo(HeaderContainer);
