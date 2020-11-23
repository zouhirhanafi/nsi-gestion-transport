import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity } from './parameter.reducer';
import { IParameter } from 'app/shared/model/parameter.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { CTable } from 'app/shared/components';

export interface IParameterProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Parameter = (props: IParameterProps) => {
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


  const { parameterList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="parameter-heading">
        <Translate contentKey="gestionTransportApp.parameter.home.title">Parameters</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gestionTransportApp.parameter.home.createLabel">Create new Parameter</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {parameterList && parameterList.length > 0 ? (
          <CTable>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="gestionTransportApp.parameter.type">Type</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('label')}>
                  <Translate contentKey="gestionTransportApp.parameter.label">Label</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
                {/* <th className="hand" onClick={sort('lib2')}>
                  <Translate contentKey="gestionTransportApp.parameter.lib2">Lib 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lib3')}>
                  <Translate contentKey="gestionTransportApp.parameter.lib3">Lib 3</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                {/* <th className="hand" onClick={sort('refExterne')}>
                  <Translate contentKey="gestionTransportApp.parameter.refExterne">Ref Externe</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('val1')}>
                  <Translate contentKey="gestionTransportApp.parameter.val1">Val 1</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('val2')}>
                  <Translate contentKey="gestionTransportApp.parameter.val2">Val 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('val3')}>
                  <Translate contentKey="gestionTransportApp.parameter.val3">Val 3</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th className="hand" onClick={sort('ordre')}>
                  <Translate contentKey="gestionTransportApp.parameter.ordre">Ordre</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th>
                  <Translate contentKey="gestionTransportApp.parameter.paraent">Paraent</Translate> <FontAwesomeIcon icon="sort" />
                </th> */}
                <th />
              </tr>
            </thead>
            <tbody>
              {parameterList.map((parameter, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${parameter.id}`} color="link" size="sm">
                      {parameter.id}
                    </Button>
                  </td>
                  <td>{parameter.type ? parameter.type.label : ''}</td>
                  <td>{parameter.label}</td>
                  <td>
                    {parameter.activated ? (
                      <Button color="success" onClick={toggleActive(parameter)}>
                        <Translate contentKey="userManagement.activated">Activated</Translate>
                      </Button>
                    ) : (
                        <Button color="danger" onClick={toggleActive(parameter)}>
                          <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                        </Button>
                      )}
                  </td>
                  {/* <td>{parameter.lib2}</td>
                  <td>{parameter.lib3}</td> */}
                  {/* <td>{parameter.refExterne}</td>
                  <td>{parameter.val1}</td>
                  <td>{parameter.val2}</td>
                  <td>{parameter.val3}</td> */}
                  <td>{parameter.ordre}</td>
                  {/* <td>{parameter.paraent ? <Link to={`parameter/${parameter.paraent.id}`}>{parameter.paraent.id}</Link> : ''}</td> */}
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      {/* <Button tag={Link} to={`${match.url}/${parameter.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button> */}
                      <Button
                        tag={Link}
                        to={`${match.url}/${parameter.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                        to={`${match.url}/${parameter.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                <Translate contentKey="gestionTransportApp.parameter.home.notFound">No Parameters found</Translate>
              </div>
            )
          )}
      </div>
      {props.totalItems ? (
        <div className={parameterList && parameterList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ parameter }: IRootState) => ({
  parameterList: parameter.entities,
  loading: parameter.loading,
  totalItems: parameter.totalItems,
});

const mapDispatchToProps = {
  getEntities,
  updateEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Parameter);
