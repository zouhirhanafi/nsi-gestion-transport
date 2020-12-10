import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { selectEngin, selectEnginsInTypes } from 'app/entities/engin/engin.reducer';
import { selectConducteur } from 'app/entities/conducteur/conducteur.reducer';
import { createEntity } from './affectation.reducer';
import { convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { ParamsSelectContainer } from 'app/shared/components';
import { useFormInput } from 'app/shared/hooks';
import { paramSelector, selectParamsDeno } from '../parameter/params.reducer';

const EnginInput = ({ conducteurId, engin }) => {
  const conducteur = useSelector(state => selectConducteur(state, conducteurId)) || {};
  const engins = useSelector(state => selectEnginsInTypes(state, conducteur.affectations)) || [];

  return (<AvGroup row>
    <Label className="col-4 col-md-3" for="affectation-engin">
      <Translate contentKey="gestionTransportApp.affectation.engin">Engin</Translate>
    </Label>
    <AvInput {...engin} id="affectation-engin" type="select" className="form-control col-8 col-md-9" name="engin.id" validate={{
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
    </AvInput>
    <AvFeedback />
  </AvGroup>)
}

const NavireInput = ({ enginId }) => {
  const engin = useSelector(state => selectEngin(state, enginId)) || {};
  const typeEngin = useSelector(state => paramSelector(engin.type)(state)) || {};
  if (typeEngin.lib2 === '-1') {
    return (
      <ParamsSelectContainer inline id="affectation-navire" name="navire" labelKey="gestionTransportApp.affectation.navire" paramName="navire" />
    );
  }
  return null;
}

const OperationInput = ({ enginId }) => {
  const engin = useSelector(state => selectEngin(state, enginId)) || {};
  // const typeEngin = useSelector(state => paramSelector(engin.type)(state)) || {};
  const operations = useSelector(state => selectParamsDeno(state, 'operation')) || [];
  // <ParamsSelectContainer inline id="affectation-operation" name="operation" labelKey="gestionTransportApp.affectation.operation" paramName="operation" validate={{
  //   required: { value: true, errorMessage: translate('entity.validation.required') },
  // }} />
  return (
    <AvGroup row>
      <Label className="col-4 col-md-3" for="affectation-operation">
        <Translate contentKey="gestionTransportApp.affectation.operation">Operation</Translate>
      </Label>
      <AvInput id="affectation-operation" type="select" className="form-control col-8 col-md-9" name="operation" validate={{
        required: { value: true, errorMessage: translate('entity.validation.required') },
      }}>
        <option value="" key="" />
        {operations
          ? operations.filter(it => it.lib2 === `${engin.type}`).map(otherEntity => (
            <option value={otherEntity.id} key={otherEntity.id}>
              {otherEntity.label}
            </option>
          ))
          : null}
      </AvInput>
      <AvFeedback />
    </AvGroup>
  );

}

export interface IAffectationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const AffectationUpdate = (props: IAffectationUpdateProps) => {
  const { conducteurs, updating, account } = props;

  const conducteur = useFormInput('');
  const engin = useFormInput('');

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
            <AvGroup row>
              <Label className="col-4 col-md-3" for="affectation-client">
                <Translate contentKey="gestionTransportApp.affectation.client">Client</Translate>
              </Label>
              <AvInput
                id="affectation-client"
                type="text"
                className="form-control col-8 col-md-9"
                name="client"
                validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                }}
              />
              <AvFeedback />
            </AvGroup>
            <AvGroup row>
              <Label className="col-4 col-md-3" for="affectation-dateAffectation">
                <Translate contentKey="gestionTransportApp.affectation.dateAffectation">Date Affectation</Translate>
              </Label>
              <AvInput
                id="affectation-dateAffectation"
                type="datetime-local"
                className="form-control col-8  col-md-9"
                name="dateAffectation"
                placeholder={'YYYY-MM-DD HH:mm'}
                value={displayDefaultDateTime()}
              />
              <AvFeedback />
            </AvGroup>
            <AvGroup row>
              <Label className="col-4 col-md-3" for="affectation-agent">
                <Translate contentKey="gestionTransportApp.affectation.agent">Agent</Translate>
              </Label>
              <AvInput id="affectation-agent" type="select" className="form-control col-8 col-md-9" name="agent.id" {...conducteur} validate={{
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
              </AvInput>
              <AvFeedback />
            </AvGroup>
            <EnginInput conducteurId={conducteur.value} engin={engin} />
            <NavireInput enginId={engin.value} />
            <OperationInput enginId={engin.value} />

            <AvGroup row>
              <Label for="affectation-reference" className="col-4 col-md-3">
                <Translate contentKey="gestionTransportApp.affectation.reference">Reference</Translate>
              </Label>
              <AvInput
                id="affectation-reference"
                type="text"
                className="form-control col-8 col-md-9"
                name="reference"
              />
              <AvFeedback />
            </AvGroup>
            <AvGroup row>
              <Label className="col-4 col-md-3" for="affectation-commentaire">
                <Translate contentKey="gestionTransportApp.affectation.commentaire">commentaire</Translate>
              </Label>
              <AvInput
                id="affectation-commentaire"
                type="text"
                className="form-control col-8 col-md-9"
                name="commentaire"
              />
              <AvFeedback />
            </AvGroup>
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
