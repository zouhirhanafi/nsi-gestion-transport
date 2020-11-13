import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/parameter">
      <Translate contentKey="global.menu.entities.parameter" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/engin">
      <Translate contentKey="global.menu.entities.engin" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/conducteur">
      <Translate contentKey="global.menu.entities.conducteur" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/affectation">
      <Translate contentKey="global.menu.entities.affectation" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
