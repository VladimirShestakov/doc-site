import React, { Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';
import Modals from '@app/modals';
import Loading from '@app/loading';

const Main = loadable(() => import('@app/main'), { fallback: <Loading /> });
const Docs = loadable(() => import('@app/docs'), { fallback: <Loading /> });
const NotFound = loadable(() => import('@app/not-found'), { fallback: <Loading /> });

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
        <Route path="/docs" exact={true} component={Docs} />
        <Route path="/docs/:page+" component={Docs} />
        <Route component={NotFound} />
      </Switch>
      <Modals />
    </Fragment>
  );
}

export default React.memo(App);
