import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, FormGroup, Input } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAffectation } from 'app/shared/model/affectation.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, cancelEntity } from './affectation.reducer';
import { useFormInput } from 'app/shared/hooks';

export interface IAffectationCancelDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const AffectationCancelDialog = (props: IAffectationCancelDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);
  const motif = useFormInput();

  const handleClose = () => {
    props.history.goBack();
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmUndo = () => {
    props.cancelEntity({ id: props.affectationEntity.id, motifAnnulation: motif.value });
  };

  const { affectationEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        <Translate contentKey="entity.confirm.title">Confirm delete operation</Translate>
      </ModalHeader>
      <ModalBody id="gestionTransportApp.affectation.undo.question">
        <Translate contentKey="gestionTransportApp.affectation.cancel.question" interpolate={{ id: affectationEntity.id }}>
          Are you sure you want to cancel this Affectation?
        </Translate>
        <FormGroup>
          <Label for="affectation-motifAnnulation"><Translate contentKey="gestionTransportApp.affectation.motifAnnulation">Motif Annulation</Translate></Label>
          <Input type="textarea" id="affectation-motifAnnulation" name="motifAnnulation" {...motif} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          <Translate contentKey="entity.action.cancel">Cancel</Translate>
        </Button>

        <Button color="warning" onClick={confirmUndo}>
          <FontAwesomeIcon icon="save" />
          &nbsp;
          <Translate contentKey="entity.action.validate">Valider</Translate>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ affectation }: IRootState) => ({
  affectationEntity: affectation.entity,
  updateSuccess: affectation.updateSuccess,
});

const mapDispatchToProps = { getEntity, cancelEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AffectationCancelDialog);
