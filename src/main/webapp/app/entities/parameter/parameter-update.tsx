import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getParameters } from 'app/entities/parameter/parameter.reducer';
import { getEntity, updateEntity, createEntity, reset } from './parameter.reducer';
import { loadEntities } from './params.reducer';
import { IParameter } from 'app/shared/model/parameter.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { ParamsSelectContainer } from 'app/shared/components';
import { useFormInput } from 'app/shared/hooks';
import { PARAM_OPERATION, PARAM_TYPE_ENGIN } from 'app/config/constants';

export interface IParameterUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const ParameterUpdate = (props: IParameterUpdateProps) => {
  const [typeId, setTypeId] = useState('0');
  const [paraentId, setParaentId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const type = useFormInput('');

  const { parameterEntity, parameters, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/parameter' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getParameters();
    props.loadEntities();
  }, []);

  useEffect(() => {
    if (parameterEntity && parameterEntity.type) {
      type.setValue(`${parameterEntity.type.id}`)
    }
  }, [parameterEntity]);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...parameterEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const buildLib2Comp = t => {
    let c = null;
    if (t === PARAM_TYPE_ENGIN) {
      c = (
        <ParamsSelectContainer id="parameter-lib2" name="lib2" labelKey="gestionTransportApp.parameter.navireASaisir" paramName="ouiNon" />
      );
    } else if (type.value === PARAM_OPERATION) {
      c = (
        <ParamsSelectContainer id="parameter-lib2" name="lib2" labelKey="gestionTransportApp.parameter.typeEngin" paramName="typeEngin" />
      );
    }
    return c;
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gestionTransportApp.parameter.home.createOrEditLabel">
            <Translate contentKey="gestionTransportApp.parameter.home.createOrEditLabel">Create or edit a Parameter</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
              <AvForm model={isNew ? {} : parameterEntity} onSubmit={saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="parameter-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="parameter-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <ParamsSelectContainer {...type} id="parameter-type" name="type.id" labelKey="gestionTransportApp.parameter.type" paramName="typeParametre" validate={{
                  required: { value: true, errorMessage: translate('entity.validation.required') },
                }} />
                <AvGroup>
                  <Label id="labelLabel" for="parameter-label">
                    <Translate contentKey="gestionTransportApp.parameter.label">Label</Translate>
                  </Label>
                  <AvField id="parameter-label" type="text" name="label" validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }} />
                </AvGroup>
                {buildLib2Comp(type.value)}
                {/* 
                <AvGroup>
                  <Label id="lib2Label" for="parameter-lib2">
                    <Translate contentKey="gestionTransportApp.parameter.lib2">Lib 2</Translate>
                  </Label>
                  <AvField id="parameter-lib2" type="text" name="lib2" />
                </AvGroup>
                <AvGroup>
                  <Label id="lib3Label" for="parameter-lib3">
                    <Translate contentKey="gestionTransportApp.parameter.lib3">Lib 3</Translate>
                  </Label>
                  <AvField id="parameter-lib3" type="text" name="lib3" />
                </AvGroup> */}
                {/* <AvGroup>
                <Label id="refExterneLabel" for="parameter-refExterne">
                  <Translate contentKey="gestionTransportApp.parameter.refExterne">Ref Externe</Translate>
                </Label>
                <AvField id="parameter-refExterne" type="text" name="refExterne" />
              </AvGroup>
              <AvGroup>
                <Label id="val1Label" for="parameter-val1">
                  <Translate contentKey="gestionTransportApp.parameter.val1">Val 1</Translate>
                </Label>
                <AvField id="parameter-val1" type="text" name="val1" />
              </AvGroup>
              <AvGroup>
                <Label id="val2Label" for="parameter-val2">
                  <Translate contentKey="gestionTransportApp.parameter.val2">Val 2</Translate>
                </Label>
                <AvField id="parameter-val2" type="text" name="val2" />
              </AvGroup>
              <AvGroup>
                <Label id="val3Label" for="parameter-val3">
                  <Translate contentKey="gestionTransportApp.parameter.val3">Val 3</Translate>
                </Label>
                <AvField id="parameter-val3" type="text" name="val3" />
              </AvGroup> */}
                <AvGroup>
                  <Label id="ordreLabel" for="parameter-ordre">
                    <Translate contentKey="gestionTransportApp.parameter.ordre">Ordre</Translate>
                  </Label>
                  <AvField id="parameter-ordre" type="string" className="form-control" name="ordre" />
                </AvGroup>
                {/* <AvGroup>
                  <Label for="parameter-paraent">
                    <Translate contentKey="gestionTransportApp.parameter.paraent">Paraent</Translate>
                  </Label>
                  <AvInput id="parameter-paraent" type="select" className="form-control" name="paraent.id">
                    <option value="" key="0" />
                    {parameters
                      ? parameters.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                      : null}
                  </AvInput>
                </AvGroup> */}
                <Button tag={Link} id="cancel-save" to="/parameter" replace color="info">
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
  parameters: storeState.parameter.entities,
  parameterEntity: storeState.parameter.entity,
  loading: storeState.parameter.loading,
  updating: storeState.parameter.updating,
  updateSuccess: storeState.parameter.updateSuccess,
});

const mapDispatchToProps = {
  loadEntities,
  getParameters,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ParameterUpdate);
