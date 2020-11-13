import React, { useState } from 'react';
import { translate, Translate } from 'react-jhipster';
import _ from 'lodash';

import {
  Row,
  Col,
  Label,
  Card,
  CardHeader,
  CardBody,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button as ReactButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  FormGroup,
} from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AvFeedback, AvForm, AvGroup, AvInput, AvCheckboxGroup, AvCheckbox } from 'availity-reactstrap-validation';
import { IRootState } from '../reducers';
import { paramSelector, paramsSelector } from 'app/entities/parameter/params.reducer';
import { connect } from 'react-redux';
import { useModal } from '../hooks';
import { isObject, isString, uniqWith } from 'lodash';

export const RowForm = props => <Row form {...props} />;

export interface ILabeledValueProps {
  labelKey: string;
  label?: string;
  children?: any;
}

export const LabeledValue = ({ labelKey, label = labelKey, children }: ILabeledValueProps) => {
  // const value = !isObject(children) ? <span className="value">{children}</span> : children;
  return (
    <Col>
      <Row>
        <Col md={4}>
          <Label>
            <Translate contentKey={labelKey}>{label}</Translate>
          </Label>
        </Col>
        <Col md={8} className="value">
          {children}
        </Col>
      </Row>
    </Col>
  );
};

export const LabeledParamValue = ({ children, ...props }: ILabeledValueProps) => (
  <LabeledValue {...props}>
    <ParamValue value={children} />
  </LabeledValue>
);

export const CardHeaderLink = ({ labelKey = undefined, icon = undefined, link }) => (
  <NavItem>
    <NavLink tag={Link} to={link} className="btn-link">
      {icon && <FontAwesomeIcon icon={icon} />}
      {labelKey && (
        <span>
          <Translate contentKey={labelKey} />
        </span>
      )}
    </NavLink>
  </NavItem>
);
export const HistoriqueLink = ({ link }) => <CardHeaderLink labelKey="entity.actio.history" icon="history" link={link} />;

export const CardNavbar = ({ titleKey = undefined, title = titleKey, editLink = undefined, links = undefined }) => (
  <Navbar>
    {titleKey ? (<Translate contentKey={titleKey}>{title}</Translate>) : title}
    <Nav className="ml-auto" navbar>
      {links}
      {editLink && <CardHeaderLink labelKey="entity.action.edit" icon="pencil-alt" link={editLink} />}
    </Nav>
  </Navbar>
);

export interface ICardDetailProps {
  titleKey?: string;
  title?: any;
  editLink?: string;
  links?: any;
  children: any;
  cardClassName?: string;
  cardHeaderClassName?: string;
}

export const CardDetail = ({ titleKey, title, editLink, children, links, cardClassName = "", cardHeaderClassName = "table-light" }: ICardDetailProps) => (
  <Card className={cardClassName}>
    <CardHeader className={cardHeaderClassName} >
      {/* <Translate contentKey="chuApp.diagnostic.detail.title">Diagnostic</Translate> */}
      {/* <Button tag={Link} to={`/diagnostic/${diagnosticEntity.id}/edit`} replace color="primary" className="ml-auto">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button> */}
      <CardNavbar titleKey={titleKey} title={title} editLink={editLink} links={links} />
    </CardHeader>
    <CardBody>{children}</CardBody>
  </Card>
);


export const Input = ({ name, id = name, ...props }) => <AvInput type="text" className="form-control" {...props} name={name} id={id} />;

export const LabeledInput = ({
  groupClassName = undefined,
  labelKey = undefined,
  label = labelKey,
  name,
  id = name,
  groupProps = {},
  ...props
}) => (
    <FormGroup className={groupClassName} {...groupProps}>
      <Label for={id}>{labelKey ? <Translate contentKey={labelKey}>{label}</Translate> : label}</Label>
      <Input {...props} name={name} id={id} />
    </FormGroup>
    // </FormGroup>
  );

export const Select = ({ options = [], labelKey = undefined, name, id = name, allowEmpty = true, renderOption = undefined, ...props }) => {
  const input = (
    <Input type="select" name={name} id={id} {...props}>
      {allowEmpty ? <option value="" /> : null}
      {options.map(option => {
        if (renderOption) return renderOption(option);
        let value = option;
        let label = option;
        if (!(_.isString(option) || _.isNumber(option))) {
          value = option.value;
          label = option.label || value;
        }
        return (
          <option key={value} value={value}>{label}</option>);
      })}
    </Input>
  );
  if (labelKey) {
    return (
      <FormGroup>
        <Label for={id}>
          <Translate contentKey={labelKey} />
        </Label>
        {input}
      </FormGroup>
    );
  } else {
    return input;
  }
};

export const ParamsSelect = props => (
  <Select renderOption={option => (<ParamOption value={option} key={option} />)} {...props} />
);
const paramsSelectMapStateToProps = (state: IRootState, { paramName }) => ({
  options: paramsSelector(paramName)(state),
});
export const ParamsSelectContainer = connect(paramsSelectMapStateToProps)(ParamsSelect);

export const ParamsCheckboxGroup = ({ options = [], labelKey = undefined, name, inline = true }) => (
  <AvCheckboxGroup inline={inline} name={name}>
    {options.map(option => (
      <ParamCheckbox value={option} key={option} />
    ))}
  </AvCheckboxGroup>
);
export const ParamsWidget = connect(paramsSelectMapStateToProps)(ParamsCheckboxGroup);

export const Option = ({ value, label = value }) => <option value={value}>{label}</option>;
const paramOptionMapStateToProps = (state: IRootState, { value }) => ({
  label: (paramSelector(value)(state) || {})['label'],
});
export const ParamOption = connect(paramOptionMapStateToProps)(Option);
export const ParamCheckbox = connect(paramOptionMapStateToProps)(AvCheckbox);

export const Span = ({ value, label = value, dispatch = undefined, ...props }) => <span {...props}>{label}</span>;
export const ParamValue = connect(paramOptionMapStateToProps)(Span);

export const Button = ReactButton;
export const CButton = ({ confirm = undefined, confirmArgs = {}, confirmTitle = 'entity.confirm.title', onClick, ...props }) => {
  const { modalOpen, toggle } = useModal();
  const onPress = e => {
    e.stopPropagation();
    if (!confirm) {
      return onClick(e);
    } else {
      toggle();
    }
  };
  return (
    <>
      <Button {...props} onClick={onPress} />
      <FormModal isOpen={modalOpen} validateAction={onClick} toggle={toggle} modalTitle={confirmTitle}>
        <Translate contentKey={confirm} interpolate={confirmArgs}>
          Etes-vous certain de vouloir exécuter cette action ?
        </Translate>
      </FormModal>
    </>
  );
};

export const CModal = ({ toggle, modalTitle = undefined, children = undefined, ...props }) => {
  return (
    <Modal toggle={toggle} {...props}>
      {modalTitle && (
        <ModalHeader toggle={toggle}>
          <Translate contentKey={modalTitle}>?</Translate>
        </ModalHeader>
      )}
      {children}
    </Modal>
  );
};
export const FormModal = ({ toggle, validateAction = undefined, cancelAction = undefined, children, ...props }) => {
  const cancel = () => {
    cancelAction && cancelAction();
    toggle();
  };
  const validate = () => {
    if (validateAction) {
      validateAction();
      toggle();
    }
  };
  const modalFooter = (
    <>
      <CButton color="secondary" onClick={cancel}>
        <FontAwesomeIcon icon="ban" />
        <Translate contentKey="entity.action.cancel">Annuler</Translate>
      </CButton>
      <CButton color="primary" onClick={validate} type="submit">
        <FontAwesomeIcon icon="check" />
        <Translate contentKey="entity.action.validate">Valider</Translate>
      </CButton>
    </>
  );
  return (
    <CModal toggle={cancel} {...props}>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{modalFooter}</ModalFooter>
    </CModal>
  );
};

export const CTable = props => <Table hover bordered striped size="sm" responsive {...props} />;

export const TableEditButton = props => (
  <Button color="info" title="Modifier" size="sm" {...props}>
    <FontAwesomeIcon icon="pencil-alt" />
  </Button>
);
export const TableDeleteButton = props => (
  <CButton color="danger" title="Supprimer" size="sm" {...props}>
    <FontAwesomeIcon icon="trash" />
  </CButton>
);
export const TableResetButton = props => (
  <CButton type="reset" color="secondary" title="" size="sm" {...props}>
    <FontAwesomeIcon icon="times" />
  </CButton>
);
export const TableCancelButton = props => (
  <CButton color="warning" title="Annuler" size="sm" {...props}>
    <FontAwesomeIcon icon="ban" />
  </CButton>
);

export const HeaderAddButton = props => (
  <Button color="primary" title="Ajouter" size="sm" {...props}>
    <FontAwesomeIcon icon="plus" />
    &nbsp;
    <Translate contentKey="entity.action.add">Ajouter</Translate>
  </Button>
);

export const HeaderSearchButton = props => (
  <Button color="dark" title="Rechercher" size="sm" {...props}>
    <FontAwesomeIcon icon="search" />
  </Button>
);

export const PrintButton = props => (
  <Button color="secondary" title="Imprimer" size="sm" className=" float-right" onClick={() => window.print()} {...props}>
    <FontAwesomeIcon icon="print" />
    &nbsp;
    <Translate contentKey="entity.action.print">Imprimer</Translate>
  </Button>
);

export const FormBackButton = props => (
  <CButton color="info" title="Retour" className="h-25 my-4" {...props}>
    <FontAwesomeIcon icon="arrow-left" />
    &nbsp;
    <span className="d-none d-md-inline">
      <Translate contentKey="entity.action.back">Retour</Translate>
    </span>
  </CButton>
);

export const FormCancelButton = props => (
  <CButton color="danger" title="Annuler" className="h-25 my-4" {...props}>
    <FontAwesomeIcon icon="ban" />
    &nbsp;
    <span className="d-none d-md-inline">
      <Translate contentKey="entity.action.cancel">Annuler</Translate>
    </span>
  </CButton>
);

export const FormSaveButton = props => (
  <CButton color="primary" title="Sauvegarder" type="submit" className="my-4 h-25" {...props}>
    <FontAwesomeIcon icon="save" />
    &nbsp;
    <Translate contentKey="entity.action.save">Save</Translate>
  </CButton>
);
