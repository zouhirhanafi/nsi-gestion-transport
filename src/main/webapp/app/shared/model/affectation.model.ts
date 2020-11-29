import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IEngin } from 'app/shared/model/engin.model';
import { IConducteur } from 'app/shared/model/conducteur.model';
import { StatutAffectation } from 'app/shared/model/enumerations/statut-affectation.model';
import { ISession } from './session.model';

export interface IAffectation {
  id?: number;
  dateAffectation?: Date | null;
  dateCreation?: Date | null;
  statut?: string;
  motifAnnulation?: string;
  operation?: number;
  reference?: string;
  commentaire?: string;
  session?: ISession;
  attributeur?: IUser;
  engin?: IEngin;
  agent?: IConducteur;
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
}

export const defaultValue: Readonly<IAffectation> = {};
