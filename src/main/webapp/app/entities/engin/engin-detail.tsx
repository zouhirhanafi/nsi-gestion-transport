import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './engin.reducer';
import { IEngin } from 'app/shared/model/engin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEnginDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EnginDetail = (props: IEnginDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { enginEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gestionTransportApp.engin.detail.title">Engin</Translate> [<b>{enginEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">
              <Translate contentKey="gestionTransportApp.engin.type">Type</Translate>
            </span>
          </dt>
          <dd>{enginEntity.type}</dd>
          <dt>
            <span id="reference">
              <Translate contentKey="gestionTransportApp.engin.reference">Reference</Translate>
            </span>
          </dt>
          <dd>{enginEntity.reference}</dd>
          <dt>
            <span id="libelle">
              <Translate contentKey="gestionTransportApp.engin.libelle">Libelle</Translate>
            </span>
          </dt>
          <dd>{enginEntity.libelle}</dd>
        </dl>
        <Button tag={Link} to="/engin" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/engin/${enginEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ engin }: IRootState) => ({
  enginEntity: engin.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EnginDetail);
