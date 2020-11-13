export interface IParameter {
  id?: number;
  label?: string;
  lib2?: string;
  lib3?: string;
  refExterne?: string;
  val1?: string;
  val2?: string;
  val3?: string;
  ordre?: number;
  type?: IParameter;
  paraent?: IParameter;
}

export const defaultValue: Readonly<IParameter> = {};
