import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Parameter from './parameter';
import Engin from './engin';
import Conducteur from './conducteur';
import Affectation from './affectation';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}parameter`} component={Parameter} />
      <ErrorBoundaryRoute path={`${match.url}engin`} component={Engin} />
      <ErrorBoundaryRoute path={`${match.url}conducteur`} component={Conducteur} />
      <ErrorBoundaryRoute path={`${match.url}affectation`} component={Affectation} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
