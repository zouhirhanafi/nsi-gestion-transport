import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';

export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    <img src="content/images/logo.png" alt="Logo" />
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <BrandIcon />&nbsp;
    <span className="brand-title">
      <Translate contentKey="global.title">GestionTransport</Translate>
    </span>
    <span className="navbar-version">{appConfig.VERSION}</span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />&nbsp;
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);

export const Consultation = props => (
  <NavItem>
    <NavLink tag={Link} to="/consultation" className="d-flex align-items-center">
      <FontAwesomeIcon icon="history" />&nbsp;
      <span>
        <Translate contentKey="global.menu.consultation">Consultation</Translate>
      </span>
    </NavLink>
  </NavItem>
);
