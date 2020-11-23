export interface IConducteur {
  id?: number;
  nom?: string;
  activated?: boolean;
  affectations?: string[];
}

export const defaultValue: Readonly<IConducteur> = { activated: true };
