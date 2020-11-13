import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Engin from './engin';
import EnginDetail from './engin-detail';
import EnginUpdate from './engin-update';
import EnginDeleteDialog from './engin-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EnginUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EnginUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EnginDetail} />
      <ErrorBoundaryRoute path={match.url} component={Engin} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EnginDeleteDialog} />
  </>
);

export default Routes;
