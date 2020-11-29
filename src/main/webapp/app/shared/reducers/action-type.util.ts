import _ from 'lodash';
import { IPayload } from 'react-jhipster';

/**
 * Appends REQUEST async action type
 */

export const REQUEST = actionType => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 */

export const SUCCESS = actionType => `${actionType}_FULFILLED`;

/**
 * Appends FAILURE async action type
 */

export const FAILURE = actionType => `${actionType}_REJECTED`;

export interface ISearchParam {
  filters?: object;
  page?: number;
  size?: number;
  sort?: string;
}
export declare type ISearchAction<T> = ({ filters, page, size, sort }: ISearchParam) => IPayload<T> | ((dispatch: any) => IPayload<T>);

export const convertFilterDashToPoint = (filters = {}) =>
  _.reduce(
    filters,
    (result, value, key) => {
      // console.log('key ? result ? ', key, result);
      key = key.replace('-', '.');
      // console.log('key apres ?', key);
      result[key] = value;
      // console.log('result apres ?', result);
      return result;
    },
    {}
  );
