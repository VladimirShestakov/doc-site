import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Modals from '@app/modals';
import Main from '@app/main';
import Docs from '@app/docs';
import NotFound from '@app/not-found';

function App() {
  useEffect(() => {
    SSR.firstRender = false;
  }, []);
  return (
    <Fragment>
      <Helmet>
        <title>React-skeleton</title>
      </Helmet>
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/:page+" component={Docs} />
        <Route component={NotFound} />
      </Switch>
      <Modals />
    </Fragment>
  );
}

export default React.memo(App);
