import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Affectation from './affectation';
import AffectationUpdate from './affectation-update';
import AffectationDeleteDialog from './affectation-delete-dialog';
import AffectationCancelDialog from './affectation-cancel-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AffectationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AffectationUpdate} />
      <ErrorBoundaryRoute path={match.url} component={Affectation} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AffectationDeleteDialog} />
    <ErrorBoundaryRoute exact path={`${match.url}/:id/cancel`} component={AffectationCancelDialog} />
  </>
);

export default Routes;
