import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './parameter.reducer';
import { IParameter } from 'app/shared/model/parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParameterDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ParameterDetail = (props: IParameterDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { parameterEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gestionTransportApp.parameter.detail.title">Parameter</Translate> [<b>{parameterEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="label">
              <Translate contentKey="gestionTransportApp.parameter.label">Label</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.label}</dd>
          <dt>
            <span id="lib2">
              <Translate contentKey="gestionTransportApp.parameter.lib2">Lib 2</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.lib2}</dd>
          <dt>
            <span id="lib3">
              <Translate contentKey="gestionTransportApp.parameter.lib3">Lib 3</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.lib3}</dd>
          <dt>
            <span id="refExterne">
              <Translate contentKey="gestionTransportApp.parameter.refExterne">Ref Externe</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.refExterne}</dd>
          <dt>
            <span id="val1">
              <Translate contentKey="gestionTransportApp.parameter.val1">Val 1</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.val1}</dd>
          <dt>
            <span id="val2">
              <Translate contentKey="gestionTransportApp.parameter.val2">Val 2</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.val2}</dd>
          <dt>
            <span id="val3">
              <Translate contentKey="gestionTransportApp.parameter.val3">Val 3</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.val3}</dd>
          <dt>
            <span id="ordre">
              <Translate contentKey="gestionTransportApp.parameter.ordre">Ordre</Translate>
            </span>
          </dt>
          <dd>{parameterEntity.ordre}</dd>
        </dl>
        <Button tag={Link} to="/parameter" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/parameter/${parameterEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ parameter }: IRootState) => ({
  parameterEntity: parameter.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ParameterDetail);
