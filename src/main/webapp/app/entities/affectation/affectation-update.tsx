import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IEngin } from 'app/shared/model/engin.model';
import { getEntities as getEngins } from 'app/entities/engin/engin.reducer';
import { IConducteur } from 'app/shared/model/conducteur.model';
import { getEntities as getConducteurs } from 'app/entities/conducteur/conducteur.reducer';
import { getEntity, updateEntity, createEntity, reset } from './affectation.reducer';
import { IAffectation } from 'app/shared/model/affectation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { ParamsSelectContainer } from 'app/shared/components';
import { loadEntities } from 'app/entities/parameter/params.reducer';

export interface IAffectationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const AffectationUpdate = (props: IAffectationUpdateProps) => {
  const [attributeurId, setAttributeurId] = useState('0');
  const [enginId, setEnginId] = useState('0');
  const [agentId, setAgentId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { affectationEntity, users, engins, conducteurs, loading, updating, account } = props;

  const handleClose = () => {
    props.history.push('/affectation');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getEngins();
    props.getConducteurs();
    props.loadEntities();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateAffectation = convertDateTimeToServer(values.dateAffectation);
    values.dateCreation = convertDateTimeToServer(values.dateCreation);

    if (errors.length === 0) {
      const entity = {
        ...affectationEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionTransportApp.affectation.home.createOrEditLabel">
            <Translate contentKey="gestionTransportApp.affectation.home.createOrEditLabel">Create or edit a Affectation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : affectationEntity} onSubmit={saveEntity}>
                {isNew ? (
                  <>
                    <AvInput
                      type="hidden"
                      name="dateCreation"
                      value={displayDefaultDateTime()}
                    />
                    <AvInput
                      type="hidden"
                      name="attributeur.id"
                      value={account.id}
                    />
                    <AvInput
                      type="hidden"
                      name="statut"
                      value="C"
                    />
                  </>
                ) : <AvGroup>
                    <Label for="affectation-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="affectation-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>}
                <AvGroup>
                  <Label id="dateAffectationLabel" for="affectation-dateAffectation">
                    <Translate contentKey="gestionTransportApp.affectation.dateAffectation">Date Affectation</Translate>
                  </Label>
                  <AvInput
                    id="affectation-dateAffectation"
                    type="datetime-local"
                    className="form-control"
                    name="dateAffectation"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.affectationEntity.dateAffectation)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="affectation-agent">
                    <Translate contentKey="gestionTransportApp.affectation.agent">Agent</Translate>
                  </Label>
                  <AvInput id="affectation-agent" type="select" className="form-control" name="agent.id">
                    <option value="" key="0" />
                    {conducteurs
                      ? conducteurs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nom}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="affectation-engin">
                    <Translate contentKey="gestionTransportApp.affectation.engin">Engin</Translate>
                  </Label>
                  <AvInput id="affectation-engin" type="select" className="form-control" name="engin.id">
                    <option value="" key="0" />
                    {engins
                      ? engins.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.libelle}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup>
                <ParamsSelectContainer id="affectation-operation" name="operation" labelKey="gestionTransportApp.affectation.operation" paramName="operation" />
                {/* <AvGroup>
                <Label id="statutLabel" for="affectation-statut">
                  <Translate contentKey="gestionTransportApp.affectation.statut">Statut</Translate>
                </Label>
                <AvInput
                  id="affectation-statut"
                  type="select"
                  className="form-control"
                  name="statut"
                  value={(!isNew && affectationEntity.statut) || 'C'}
                >
                  <option value="C">{translate('gestionTransportApp.StatutAffectation.C')}</option>
                  <option value="S">{translate('gestionTransportApp.StatutAffectation.S')}</option>
                  <option value="N">{translate('gestionTransportApp.StatutAffectation.N')}</option>
                </AvInput>
              </AvGroup> */}
                {/* <AvGroup>
                <Label for="affectation-attributeur">
                  <Translate contentKey="gestionTransportApp.affectation.attributeur">Attributeur</Translate>
                </Label>
                <AvInput id="affectation-attributeur" type="select" className="form-control" name="attributeur.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup> */}
                <Button tag={Link} id="cancel-save" to="/affectation" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  engins: storeState.engin.entities,
  conducteurs: storeState.conducteur.entities,
  affectationEntity: storeState.affectation.entity,
  loading: storeState.affectation.loading,
  updating: storeState.affectation.updating,
  updateSuccess: storeState.affectation.updateSuccess,
  account: storeState.authentication.account,
});

const mapDispatchToProps = {
  loadEntities,
  getUsers,
  getEngins,
  getConducteurs,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationUpdate);
