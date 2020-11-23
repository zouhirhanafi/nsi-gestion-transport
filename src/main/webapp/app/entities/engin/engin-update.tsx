import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './engin.reducer';
import { IEngin } from 'app/shared/model/engin.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { ParamsSelectContainer } from 'app/shared/components';
import { loadEntities } from 'app/entities/parameter/params.reducer';

export interface IEnginUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const EnginUpdate = (props: IEnginUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { enginEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/engin' + props.location.search);
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
        ...enginEntity,
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
          <h2 id="gestionTransportApp.engin.home.createOrEditLabel">
            <Translate contentKey="gestionTransportApp.engin.home.createOrEditLabel">Create or edit a Engin</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : enginEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="engin-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="engin-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <ParamsSelectContainer id="engin-type" name="type" labelKey="gestionTransportApp.engin.type" paramName="typeEngin" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                }}
                />
                <AvGroup>
                  <Label id="libelleLabel" for="engin-libelle">
                    <Translate contentKey="gestionTransportApp.engin.libelle">Libelle</Translate>
                  </Label>
                  <AvField
                    id="engin-libelle"
                    type="text"
                    name="libelle"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                    }}
                  />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/engin" replace color="info">
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
  enginEntity: storeState.engin.entity,
  loading: storeState.engin.loading,
  updating: storeState.engin.updating,
  updateSuccess: storeState.engin.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(EnginUpdate);
