import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './conducteur.reducer';
import { IConducteur } from 'app/shared/model/conducteur.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ParamsValues } from 'app/shared/components';

export interface IConducteurDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const ConducteurDetail = (props: IConducteurDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { conducteurEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gestionTransportApp.conducteur.detail.title">Conducteur</Translate> [<b>{conducteurEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nom">
              <Translate contentKey="gestionTransportApp.conducteur.nom">Nom</Translate>
            </span>
          </dt>
          <dd>{conducteurEntity.nom}</dd>
          <dt>
            <span id="affectation">
              <Translate contentKey="gestionTransportApp.conducteur.affectations">Affectation</Translate>
            </span>
          </dt>
          <dd><ParamsValues values={conducteurEntity.affectations} /></dd>
        </dl>
        <Button tag={Link} to="/conducteur" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/conducteur/${conducteurEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ conducteur }: IRootState) => ({
  conducteurEntity: conducteur.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConducteurDetail);
