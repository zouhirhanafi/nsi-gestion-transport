import moment from 'moment';

import { APP_LOCAL_DATETIME_FORMAT, APP_LOCAL_DATETIME_FORMAT_Z, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export const convertDateFromServer = date => (date ? moment(date).format(APP_LOCAL_DATE_FORMAT) : null);

export const convertDateTimeFromServer = date => (date ? moment(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = date => (date ? moment(date, APP_LOCAL_DATETIME_FORMAT_Z).toDate() : null);

export const displayDefaultDateTime = () => moment().format(APP_LOCAL_DATETIME_FORMAT);

export const displayDefaultDate = () => moment().format(APP_LOCAL_DATE_FORMAT);
