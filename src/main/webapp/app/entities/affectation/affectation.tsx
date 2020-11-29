import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { IRootState } from 'app/shared/reducers';
import { reset } from './affectation.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { CTable, ParamValue } from 'app/shared/components';
import { NomConducteur } from '../conducteur/conducteur';
import { NomEngin } from '../engin/engin';

export interface IAffectationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Affectation = (props: IAffectationProps) => {

  const sort = col => () => {
    console.warn('not supported');
  }

  const { affectationList, match } = props;
  return (
    <div>
      <h2 id="affectation-heading">
        <Translate contentKey="gestionTransportApp.affectation.home.title">Affectations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="gestionTransportApp.affectation.home.createLabel">Create new Affectation</Translate>
        </Link>
      </h2>
      {affectationList && affectationList.length > 0 ? (
        <CTable className="text-nowrap">
          <thead>
            <tr>
              <th />
              <th className="hand" onClick={sort('id')}>
                #
                </th>
              <th>
                <Translate contentKey="gestionTransportApp.affectation.agent">Agent</Translate>
              </th>
              <th>
                <Translate contentKey="gestionTransportApp.affectation.engin">Engin</Translate>
              </th>
              <th className="hand" onClick={sort('operation')}>
                <Translate contentKey="gestionTransportApp.affectation.operation">Operation</Translate>
              </th>
              <th className="hand" onClick={sort('reference')}>
                <Translate contentKey="gestionTransportApp.affectation.reference">Reference</Translate>
              </th>
              <th className="hand" onClick={sort('dateAffectation')}>
                <Translate contentKey="gestionTransportApp.affectation.dateAffectation">Date Affectation</Translate>{' '}
              </th>
              <th className="hand" onClick={sort('commentaire')}>
                <Translate contentKey="gestionTransportApp.affectation.commentaire">Commentaire</Translate>{' '}
              </th>
              {/* <th className="hand" onClick={sort('dateCreation')}>
                    <Translate contentKey="gestionTransportApp.affectation.dateCreation">Date Creation</Translate>{' '}
                   
                  </th> */}
              {/* <th className="hand" onClick={sort('statut')}>
                    <Translate contentKey="gestionTransportApp.affectation.statut">Statut</Translate>
                  </th>
                  <th className="hand" onClick={sort('motifAnnulation')}>
                    <Translate contentKey="gestionTransportApp.affectation.motifAnnulation">Motif Annulation</Translate>{' '}
                   
                  </th> */}
              {/* <th>
                    <Translate contentKey="gestionTransportApp.affectation.attributeur">Attributeur</Translate>{' '}
                   
                  </th> */}
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
                <td className="text-left">
                  {
                    !affectation.statut || 'C' === affectation.statut.toString() && (
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${i}/cancel`} color="warning" size="sm">
                          <FontAwesomeIcon icon="ban" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.cancel">Cancel</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${i}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    )}
                </td>
                <td>
                  {i + 1}
                </td>
                <td className="text-nowrap">{affectation.agent ? <NomConducteur id={affectation.agent.id} /> : ''}</td>
                <td className="text-nowrap">{affectation.engin ? <NomEngin id={affectation.engin.id} /> : ''}</td>
                <td className="text-nowrap"><ParamValue value={affectation.operation} /></td>
                <td>{affectation.reference}</td>
                <td className="text-nowrap">
                  {affectation.dateAffectation ? (
                    <TextFormat type="date" value={affectation.dateAffectation} format={APP_DATE_FORMAT} />
                  ) : null}
                </td>
                <td>{affectation.commentaire}</td>
                {/* <td>
                      {affectation.dateCreation ? (
                        <TextFormat type="date" value={affectation.dateCreation} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td> */}
                {/* <td>
                      <Translate contentKey={`gestionTransportApp.StatutAffectation.${affectation.statut}`} />
                    </td>
                    <td>{affectation.motifAnnulation}</td> */}
                {/* <td>{affectation.attributeur ? affectation.attributeur.id : ''}</td> */}
              </tr>
            ))}
          </tbody>
        </CTable>
      ) : (
          <div className="alert alert-warning">
            <Translate contentKey="gestionTransportApp.affectation.home.notFound">No Affectations found</Translate>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = ({ affectation }: IRootState) => ({
  affectationList: affectation.entities,
  totalItems: affectation.totalItems,
  updateSuccess: affectation.updateSuccess,
});

const mapDispatchToProps = {
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Affectation);
