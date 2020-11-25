import React, { useEffect } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getEngins } from 'app/entities/engin/engin.reducer';
import { getConducteurs } from 'app/entities/conducteur/conducteur.reducer';
import Affectation from 'app/entities/affectation';
import SessionUpdate from './session-update';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Home = (props: IHomeProp) => {
  const { session } = props;

  useEffect(() => {
    props.getConducteurs();
    props.getEngins();
  }, []);

  return (
    <Col>
      <SessionUpdate />
      <hr />
      {session && <Affectation {...props} />}
    </Col>
  );
};

const mapStateToProps = (state: IRootState) => ({
  session: state.session.entity,
});

const mapDispatchToProps = {
  getConducteurs,
  getEngins
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
