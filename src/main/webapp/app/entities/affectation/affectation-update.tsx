import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { selectEnginsInTypes } from 'app/entities/engin/engin.reducer';
import { selectConducteur } from 'app/entities/conducteur/conducteur.reducer';
import { createEntity } from './affectation.reducer';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { ParamsSelectContainer } from 'app/shared/components';
import { useFormInput } from 'app/shared/hooks';


const EnginInput = ({ conducteurId }) => {
  const conducteur = useSelector(state => selectConducteur(state, conducteurId)) || {};
  const engins = useSelector(state => selectEnginsInTypes(state, conducteur.affectations)) || [];

  return (<AvGroup>
    <Label for="affectation-engin">
      <Translate contentKey="gestionTransportApp.affectation.engin">Engin</Translate>
    </Label>
    <AvField id="affectation-engin" type="select" className="form-control" name="engin.id" validate={{
      required: { value: true, errorMessage: translate('entity.validation.required') },
    }}>
      <option value="" key="0" />
      {engins
        ? engins.map(otherEntity => (
          <option value={otherEntity.id} key={otherEntity.id}>
            {otherEntity.libelle}
          </option>
        ))
        : null}
    </AvField>
  </AvGroup>)
}
export interface IAffectationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const AffectationUpdate = (props: IAffectationUpdateProps) => {
  const { conducteurs, updating, account } = props;

  const conducteur = useFormInput('');

  const handleClose = () => {
    props.history.goBack();
  };

  const saveEntity = (event, errors, values) => {
    values.dateAffectation = convertDateTimeToServer(values.dateAffectation);
    values.dateCreation = convertDateTimeToServer(values.dateCreation);

    if (errors.length === 0) {
      props.createEntity(values);
      handleClose();
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
          <AvForm model={{}} onSubmit={saveEntity}>
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
                value={displayDefaultDateTime()}
              />
            </AvGroup>
            <AvGroup>
              <Label for="affectation-agent">
                <Translate contentKey="gestionTransportApp.affectation.agent">Agent</Translate>
              </Label>
              <AvField id="affectation-agent" type="select" className="form-control" name="agent.id" {...conducteur} validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') },
              }}>
                <option value="" key="0" />
                {conducteurs
                  ? conducteurs.map(otherEntity => (
                    <option value={otherEntity.id} key={otherEntity.id}>
                      {otherEntity.nom}
                    </option>
                  ))
                  : null}
              </AvField>
            </AvGroup>
            <EnginInput conducteurId={conducteur.value} />
            <ParamsSelectContainer id="affectation-operation" name="operation" labelKey="gestionTransportApp.affectation.operation" paramName="operation" validate={{
              required: { value: true, errorMessage: translate('entity.validation.required') },
            }} />
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
            <Button id="cancel-save" onClick={() => handleClose()} replace color="info">
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
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  conducteurs: storeState.conducteur.conducteurs,
  loading: storeState.affectation.loading,
  updating: storeState.affectation.updating,
  updateSuccess: storeState.affectation.updateSuccess,
  account: storeState.authentication.account,
});

const mapDispatchToProps = {
  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationUpdate);
