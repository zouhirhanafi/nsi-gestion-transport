import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './affectation.reducer';
import { IAffectation } from 'app/shared/model/affectation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { StatutAffectation } from 'app/shared/model/enumerations/statut-affectation.model';
import { CTable, ParamValue } from 'app/shared/components';
import AffectationFilter from './affectation-filter';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IAffectationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Affectation = (props: IAffectationProps) => {
    const [paginationState, setPaginationState] = useState(
        overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
    );
    const [sorting, setSorting] = useState(false);
    const { isAdmin, filters, totalItems, affectationList, match, loading } = props;

    const getAllEntities = () => {
        props.getEntities({ filters, page: paginationState.activePage - 1, size: paginationState.itemsPerPage, sort: `${paginationState.sort},${paginationState.order}` });
    };

    const resetAll = () => {
        props.reset();
        setPaginationState({
            ...paginationState,
            activePage: 1,
        });
        props.getEntities({});
    };

    const handlePagination = currentPage =>
        setPaginationState({
            ...paginationState,
            activePage: currentPage,
        });

    useEffect(() => {
        resetAll();
    }, []);

    useEffect(() => {
        if (props.updateSuccess) {
            resetAll();
        }
    }, [props.updateSuccess]);

    useEffect(() => {
        getAllEntities();
    }, [paginationState.activePage, filters]);

    const handleLoadMore = () => {
        if ((window as any).pageYOffset > 0) {
            setPaginationState({
                ...paginationState,
                activePage: paginationState.activePage + 1,
            });
        }
    };

    useEffect(() => {
        if (sorting) {
            getAllEntities();
            setSorting(false);
        }
    }, [sorting]);

    const sort = p => () => {
        props.reset();
        setPaginationState({
            ...paginationState,
            activePage: 1,
            order: paginationState.order === 'asc' ? 'desc' : 'asc',
            sort: p,
        });
        setSorting(true);
    };

    return (
        <div>
            <h2 id="affectation-heading">
                <Translate contentKey="gestionTransportApp.affectation.home.title">Affectations</Translate>
                {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                    <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gestionTransportApp.affectation.home.createLabel">Create new Affectation</Translate>
                </Link> */}
            </h2>
            <AffectationFilter />
            {affectationList && affectationList.length > 0 ? (
                <CTable className="text-nowrap">
                    <thead>
                        <tr>
                            {/* <th /> */}
                            <th className="hand" onClick={sort('id')}>
                                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                                <Translate contentKey="gestionTransportApp.affectation.agent">Agent</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th>
                                <Translate contentKey="gestionTransportApp.affectation.engin">Engin</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={sort('operation')}>
                                <Translate contentKey="gestionTransportApp.affectation.operation">Operation</Translate> <FontAwesomeIcon icon="sort" />
                            </th>
                            <th className="hand" onClick={sort('dateAffectation')}>
                                <Translate contentKey="gestionTransportApp.affectation.dateAffectation">Date Affectation</Translate>{' '}
                                <FontAwesomeIcon icon="sort" />
                            </th>
                            {isAdmin && (
                                <>
                                    <th>
                                        <Translate contentKey="gestionTransportApp.affectation.attributeur">Attributeur</Translate>{' '}
                                        <FontAwesomeIcon icon="sort" />
                                    </th>
                                    <th className="hand" onClick={sort('dateCreation')}>
                                        <Translate contentKey="gestionTransportApp.affectation.dateCreation">Date Creation</Translate>{' '}
                                        <FontAwesomeIcon icon="sort" />
                                    </th>
                                    {/* <th className="hand" onClick={sort('statut')}>
                                            <Translate contentKey="gestionTransportApp.affectation.statut">Statut</Translate> <FontAwesomeIcon icon="sort" />
                                        </th> */}
                                    <th className="hand" onClick={sort('motifAnnulation')}>
                                        <Translate contentKey="gestionTransportApp.affectation.motifAnnulation">Motif Annulation</Translate>{' '}
                                        <FontAwesomeIcon icon="sort" />
                                    </th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {affectationList.map((affectation, i) => (
                            <tr className={classNames(
                                {
                                    'text-warning': affectation.statut && 'N' === affectation.statut.toString(),
                                    'text-danger': affectation.statut && 'S' === affectation.statut.toString()
                                }
                            )} key={`entity-${i}`}>
                                {/* <td className="text-left">
                                        {
                                            !affectation.statut || 'C' === affectation.statut.toString() && (
                                                <div className="btn-group flex-btn-group-container">
                                                    <Button tag={Link} to={`${match.url}/${affectation.id}/cancel`} color="warning" size="sm">
                                                        <FontAwesomeIcon icon="ban" />{' '}
                                                        <span className="d-none d-md-inline">
                                                            <Translate contentKey="entity.action.cancel">Cancel</Translate>
                                                        </span>
                                                    </Button>
                                                    <Button tag={Link} to={`${match.url}/${affectation.id}/delete`} color="danger" size="sm">
                                                        <FontAwesomeIcon icon="trash" />{' '}
                                                        <span className="d-none d-md-inline">
                                                            <Translate contentKey="entity.action.delete">Delete</Translate>
                                                        </span>
                                                    </Button>
                                                </div>
                                            )}
                                    </td> */}
                                <td>
                                    {affectation.id}
                                </td>
                                <td>{affectation.agent ? affectation.agent.nom : ''}</td>
                                <td>{affectation.engin ? affectation.engin.libelle : ''}</td>
                                <td><ParamValue value={affectation.operation} /></td>
                                <td>
                                    {affectation.dateAffectation ? (
                                        <TextFormat type="date" value={affectation.dateAffectation} format={APP_DATE_FORMAT} />
                                    ) : null}
                                </td>
                                {isAdmin && (
                                    <>
                                        <td>{affectation.attributeur ? `${affectation.attributeur.firstName} ${affectation.attributeur.lastName} ` : ''}</td>
                                        <td>
                                            {affectation.dateCreation ? (
                                                <TextFormat type="date" value={affectation.dateCreation} format={APP_DATE_FORMAT} />
                                            ) : null}
                                        </td>
                                        {/* <td>
                                                <Translate contentKey={`gestionTransportApp.StatutAffectation.${affectation.statut}`} />
                                            </td> */}
                                        <td>{affectation.motifAnnulation}</td>
                                    </>
                                )}

                            </tr>
                        ))}
                    </tbody>
                </CTable>
            ) : (
                    !loading && (
                        <div className="alert alert-warning">
                            <Translate contentKey="gestionTransportApp.affectation.home.notFound">No Affectations found</Translate>
                        </div>
                    )
                )}
            {totalItems ? (
                <div className={affectationList && affectationList.length > 0 ? '' : 'd-none'}>
                    <Row className="justify-content-center">
                        <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
                    </Row>
                    <Row className="justify-content-center">
                        <JhiPagination
                            activePage={paginationState.activePage}
                            onSelect={handlePagination}
                            maxButtons={5}
                            itemsPerPage={paginationState.itemsPerPage}
                            totalItems={totalItems}
                        />
                    </Row>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = ({ affectationOnline, authentication }: IRootState) => ({
    isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
    filters: affectationOnline.filters,
    affectationList: affectationOnline.entities,
    loading: affectationOnline.loading,
    totalItems: affectationOnline.totalItems,
    links: affectationOnline.links,
    entity: affectationOnline.entity,
    updateSuccess: affectationOnline.updateSuccess,
});

const mapDispatchToProps = {
    getEntities,
    reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Affectation);
