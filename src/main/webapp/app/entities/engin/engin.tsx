import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, selectEngin, updateEntity } from './engin.reducer';
import { IEngin } from 'app/shared/model/engin.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ParamValue, CTable } from 'app/shared/components';

export interface IEnginProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Engin = (props: IEnginProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const toggleActive = entity => () =>
    props.updateEntity({
      ...entity,
      activated: !entity.activated,
    });

  const { enginList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="engin-heading">
        <Translate contentKey="gestionTransportApp.engin.home.title">Engins</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gestionTransportApp.engin.home.createLabel">Create new Engin</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {enginList && enginList.length > 0 ? (
          <CTable>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('type')}>
                  <Translate contentKey="gestionTransportApp.engin.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('libelle')}>
                  <Translate contentKey="gestionTransportApp.engin.libelle">Libelle</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {enginList.map((engin, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${engin.id}`} color="link" size="sm">
                      {engin.id}
                    </Button>
                  </td>
                  <td><ParamValue value={engin.type} /></td>
                  <td>{engin.libelle}</td>
                  <td>
                    {engin.activated ? (
                      <Button color="success" onClick={toggleActive(engin)}>
                        <Translate contentKey="userManagement.activated">Activated</Translate>
                      </Button>
                    ) : (
                        <Button color="danger" onClick={toggleActive(engin)}>
                          <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                        </Button>
                      )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      {/* <Button tag={Link} to={`${match.url}/${engin.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button> */}
                      <Button
                        tag={Link}
                        to={`${match.url}/${engin.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${engin.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </CTable>
        ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="gestionTransportApp.engin.home.notFound">No Engins found</Translate>
              </div>
            )
          )}
      </div>
      {props.totalItems ? (
        <div className={enginList && enginList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
          ''
        )}
    </div>
  );
};

const mapStateToProps = ({ engin }: IRootState) => ({
  enginList: engin.entities,
  loading: engin.loading,
  totalItems: engin.totalItems,
});

const mapDispatchToProps = {
  getEntities,
  updateEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Engin);


export const NomEngin = ({ id, ...props }) => {
  const engin = useSelector(state => selectEngin(state, id)) || {};
  return <span {...props}>{engin.libelle || id}</span>

}
