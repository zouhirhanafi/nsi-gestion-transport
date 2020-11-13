import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Conducteur from './conducteur';
import ConducteurDetail from './conducteur-detail';
import ConducteurUpdate from './conducteur-update';
import ConducteurDeleteDialog from './conducteur-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConducteurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConducteurUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConducteurDetail} />
      <ErrorBoundaryRoute path={match.url} component={Conducteur} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ConducteurDeleteDialog} />
  </>
);

export default Routes;
