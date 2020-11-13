import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './affectation.reducer';
import { IAffectation } from 'app/shared/model/affectation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAffectationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AffectationDetail = (props: IAffectationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { affectationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="gestionTransportApp.affectation.detail.title">Affectation</Translate> [<b>{affectationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateAffectation">
              <Translate contentKey="gestionTransportApp.affectation.dateAffectation">Date Affectation</Translate>
            </span>
          </dt>
          <dd>
            {affectationEntity.dateAffectation ? (
              <TextFormat value={affectationEntity.dateAffectation} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="dateCreation">
              <Translate contentKey="gestionTransportApp.affectation.dateCreation">Date Creation</Translate>
            </span>
          </dt>
          <dd>
            {affectationEntity.dateCreation ? (
              <TextFormat value={affectationEntity.dateCreation} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="statut">
              <Translate contentKey="gestionTransportApp.affectation.statut">Statut</Translate>
            </span>
          </dt>
          <dd>{affectationEntity.statut}</dd>
          <dt>
            <span id="motifAnnulation">
              <Translate contentKey="gestionTransportApp.affectation.motifAnnulation">Motif Annulation</Translate>
            </span>
          </dt>
          <dd>{affectationEntity.motifAnnulation}</dd>
          <dt>
            <span id="operation">
              <Translate contentKey="gestionTransportApp.affectation.operation">Operation</Translate>
            </span>
          </dt>
          <dd>{affectationEntity.operation}</dd>
          <dt>
            <Translate contentKey="gestionTransportApp.affectation.attributeur">Attributeur</Translate>
          </dt>
          <dd>{affectationEntity.attributeur ? affectationEntity.attributeur.id : ''}</dd>
          <dt>
            <Translate contentKey="gestionTransportApp.affectation.engin">Engin</Translate>
          </dt>
          <dd>{affectationEntity.engin ? affectationEntity.engin.id : ''}</dd>
          <dt>
            <Translate contentKey="gestionTransportApp.affectation.agent">Agent</Translate>
          </dt>
          <dd>{affectationEntity.agent ? affectationEntity.agent.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/affectation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/affectation/${affectationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ affectation }: IRootState) => ({
  affectationEntity: affectation.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationDetail);
