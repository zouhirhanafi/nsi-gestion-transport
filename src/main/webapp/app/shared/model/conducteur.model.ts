export interface IConducteur {
  id?: number;
  nom?: string;
  affectations?: string[];
}

export const defaultValue: Readonly<IConducteur> = {};
