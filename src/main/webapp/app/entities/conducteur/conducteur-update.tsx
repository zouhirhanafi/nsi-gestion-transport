import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './conducteur.reducer';
import { IConducteur } from 'app/shared/model/conducteur.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { ParamsWidget } from 'app/shared/components';
import { loadEntities } from 'app/entities/parameter/params.reducer';

export interface IConducteurUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const ConducteurUpdate = (props: IConducteurUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { conducteurEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/conducteur' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
    props.loadEntities();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...conducteurEntity,
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
          <h2 id="gestionTransportApp.conducteur.home.createOrEditLabel">
            <Translate contentKey="gestionTransportApp.conducteur.home.createOrEditLabel">Create or edit a Conducteur</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : conducteurEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="conducteur-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="conducteur-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomLabel" for="conducteur-nom">
                    <Translate contentKey="gestionTransportApp.conducteur.nom">Nom</Translate>
                  </Label>
                  <AvField
                    id="conducteur-nom"
                    type="text"
                    name="nom"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>

                <AvGroup>
                  <Label id="affectationLabel">
                    <Translate contentKey="gestionTransportApp.conducteur.affectations">Affectation</Translate>
                  </Label>
                  <ParamsWidget name="affectations" paramName="typeEngin" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/conducteur" replace color="info">
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
  conducteurEntity: storeState.conducteur.entity,
  loading: storeState.conducteur.loading,
  updating: storeState.conducteur.updating,
  updateSuccess: storeState.conducteur.updateSuccess,
});

const mapDispatchToProps = {
  loadEntities,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConducteurUpdate);
