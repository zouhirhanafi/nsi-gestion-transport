export interface IConducteur {
  id?: number;
  nom?: string;
  affectation?: number;
}

export const defaultValue: Readonly<IConducteur> = {};
