import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { Col } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { HeaderSearchButton, TableResetButton, FLabeledInput, FSelect, FInput } from 'app/shared/components';
import { IRootState } from 'app/shared/reducers';
import { search } from './affectation.reducer';
import { StatutAffectation } from 'app/shared/model/enumerations/statut-affectation.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

const AffectationFilter = props => {
    const { filters, users = [], isAdmin } = props;

    useEffect(() => {
        props.getUsers();
    }, []);

    const options = users.map(user => ({ value: user.id, label: `${user.firstName} ${user.lastName}` }))

    return (
        <div className="card-header border-primary mb-4 ">
            <Formik
                initialValues={filters}
                onSubmit={(values, actions) => {
                    props.search(values);
                }}
                onReset={(values) => {
                    props.search(values);
                }}
            >
                <Form>
                    <div className="form-row align-items-center">
                        <FLabeledInput
                            labelKey={'entity.filter.fromDate'}
                            name="dateAffectation-greaterThanOrEqual"
                            type="date"
                            groupClassName="col-auto"
                        />
                        <FLabeledInput
                            labelKey={'entity.filter.toDate'}
                            name="dateAffectation-lessThanOrEqual"
                            type="date"
                            groupClassName="col-auto"
                        />
                        {isAdmin && (
                            <>
                                <div className="col-auto">
                                    <FSelect name="attributeurId-equals"
                                        labelKey="gestionTransportApp.affectation.attributeur"
                                        options={options}
                                    />
                                </div>
                                <div className="col-auto">
                                    <FSelect
                                        labelKey="gestionTransportApp.affectation.statut"
                                        name="statut-equals"
                                        options={[
                                            { value: 'C', label: translate('gestionTransportApp.StatutAffectation.C') },
                                            { value: 'N', label: translate('gestionTransportApp.StatutAffectation.N') },
                                            { value: 'S', label: translate('gestionTransportApp.StatutAffectation.S') }
                                        ]}
                                    />
                                </div>
                            </>
                        )}
                        <div className="col-auto">
                            <HeaderSearchButton type="submit" className="m-1" />
                            <TableResetButton />
                        </div>
                    </div>

                    {/* <DebugFormik /> */}
                </Form>
            </Formik>
        </div>
    );
};

const mapStateToProps = (storeState: IRootState) => ({
    isAdmin: hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.ADMIN]),
    filters: storeState.affectationOnline.filters,
    users: storeState.userManagement.users,
});

const mapDispatchToProps = {
    search,
    getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(AffectationFilter);