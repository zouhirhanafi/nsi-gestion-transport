import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import entities, { EntitiesState } from './entities.reducer';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import parameter, {
  ParameterState
} from 'app/entities/parameter/parameter.reducer';
// prettier-ignore
import params, {
  ParamsState
} from 'app/entities/parameter/params.reducer';
// prettier-ignore
import engin, {
  EnginState
} from 'app/entities/engin/engin.reducer';
// prettier-ignore
import conducteur, {
  ConducteurState
} from 'app/entities/conducteur/conducteur.reducer';
// prettier-ignore
import affectation, {
  AffectationState
} from 'app/entities/affectation/affectation.reducer';
import { NetworkState, networkReducer as network } from 'app/config/detectNetwork';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly network: NetworkState;
  readonly entities: EntitiesState;
  readonly params: ParamsState;
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly parameter: ParameterState;
  readonly engin: EnginState;
  readonly conducteur: ConducteurState;
  readonly affectation: AffectationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  network,
  entities,
  params,
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  parameter,
  engin,
  conducteur,
  affectation,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
