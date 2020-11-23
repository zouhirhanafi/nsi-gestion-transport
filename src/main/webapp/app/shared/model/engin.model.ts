export interface IEngin {
  id?: number;
  type?: number;
  activated?: boolean;
  libelle?: string;
}

export const defaultValue: Readonly<IEngin> = { activated: true };
