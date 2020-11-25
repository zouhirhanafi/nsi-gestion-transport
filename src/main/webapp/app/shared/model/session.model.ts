import { IAffectation } from './affectation.model';

export interface ISession {
  id?: number;
  date?: Date | null;
  shift?: number;
  closed?: boolean;
  createdBy?: string;
  createdDate?: Date | null;
  lastModifiedBy?: string;
  lastModifiedDate?: Date | null;
  affectations?: ReadonlyArray<IAffectation>;
}

export const defaultValue: Readonly<ISession> = null;
