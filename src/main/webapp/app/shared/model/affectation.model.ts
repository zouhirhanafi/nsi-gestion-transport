import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IEngin } from 'app/shared/model/engin.model';
import { IConducteur } from 'app/shared/model/conducteur.model';
import { StatutAffectation } from 'app/shared/model/enumerations/statut-affectation.model';

export interface IAffectation {
  id?: number;
  dateAffectation?: string;
  dateCreation?: string;
  statut?: StatutAffectation;
  motifAnnulation?: string;
  operation?: number;
  attributeur?: IUser;
  engin?: IEngin;
  agent?: IConducteur;
}

export const defaultValue: Readonly<IAffectation> = {};
