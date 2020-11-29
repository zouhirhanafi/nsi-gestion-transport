import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Label, Card, CardHeader, CardBody, UncontrolledCollapse, Collapse, NavbarToggler } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { closeEntity, createEntity } from './session.reducer';
import { convertDateFromServer, displayDefaultDate } from 'app/shared/util/date-utils';
import { CardDetail, ParamsSelectContainer } from 'app/shared/components';
import { useWindowSize } from 'app/shared/hooks';
import { APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISessionUpdateProps extends StateProps, DispatchProps { }

export const SessionUpdate = (props: ISessionUpdateProps) => {
  const { sessionEntity, updating, affectations } = props;
  const { width = 600 } = useWindowSize();


  useEffect(() => {
    if (props.updateSuccess) {
      console.warn('maj avec succes');
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      if (!sessionEntity) {
        props.createEntity(values);
      } else {
        const entity = {
          ...sessionEntity,
          ...values,
          affectations,
        };
        props.closeEntity(entity);
      }
    }
  };

  return (
    <CardDetail titleKey="gestionTransportApp.session.detail.title"
      // links={
      //   (<NavbarToggler className="float-right card-link toggler" onClick={toggle}>
      //     <FontAwesomeIcon icon={isOpen ? 'chevron-down' : 'chevron-up'} />
      //   </NavbarToggler>)
      // }
      collapsible
      defaultOpen={!sessionEntity}
    >
      <AvForm model={sessionEntity || {}} onSubmit={saveEntity} inline={width > 580}>
        <AvInput type="hidden" name="id" />
        <Label className="sr-only" for="session-date">
          <Translate contentKey="gestionTransportApp.session.date">Date</Translate>
        </Label>
        <AvInput
          id="session-date"
          type="date"
          className="form-control mb-2 mr-sm-2"
          name="date"
          placeholder={APP_LOCAL_DATE_FORMAT}
          value={sessionEntity ? sessionEntity.date : displayDefaultDate()}
          disabled={!!sessionEntity}
        />
        <Label className="sr-only" for="session-shift">
          <Translate contentKey="gestionTransportApp.session.shift">Shift</Translate>
        </Label>
        <ParamsSelectContainer id="session-shift" name="shift" paramName="shift" emptyText={translate('gestionTransportApp.session.shift')} disabled={!!sessionEntity} className="form-control mb-2 mr-sm-2"
        />
        {
          sessionEntity ? (
            <Button color="secondary" className="mb-2" type="submit" disabled={updating}>
              <FontAwesomeIcon icon="check-circle" />
        &nbsp;
              <Translate contentKey="entity.action.close">Close</Translate>
            </Button>

          ) : (
              <Button color="primary" className="mb-2" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
        &nbsp;
                <Translate contentKey="entity.action.create">Create</Translate>
              </Button>
            )
        }
      </AvForm>
    </CardDetail >
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  sessionEntity: storeState.session.entity,
  loading: storeState.session.loading,
  updating: storeState.session.updating,
  updateSuccess: storeState.session.updateSuccess,
  affectations: storeState.affectation.entities,
});

const mapDispatchToProps = {
  createEntity,
  closeEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SessionUpdate);
