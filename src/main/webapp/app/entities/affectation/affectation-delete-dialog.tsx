import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { deleteEntity } from './affectation.reducer';

export interface IAffectationDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const AffectationDeleteDialog = (props: IAffectationDeleteDialogProps) => {

  const handleClose = () => {
    props.history.goBack();
  };

  const confirmDelete = () => {
    props.deleteEntity(props.match.params.id);
    handleClose();
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="gestionTransportApp.affectation.delete.question">
        <Translate contentKey="gestionTransportApp.affectation.delete.question">
          Are you sure you want to delete this Affectation?
        </Translate>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>
        <Button id="jhi-confirm-delete-affectation" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          <Translate contentKey="entity.action.delete">Delete</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ affectation }: IRootState) => ({
  updateSuccess: affectation.updateSuccess,
});

const mapDispatchToProps = { deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationDeleteDialog);
