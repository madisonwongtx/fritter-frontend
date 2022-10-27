import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Filter} from '../filter/model';

type FilterResponse = {
  username: string;
  status: string;
};

/**
 * Transform raw Filter into usable information
 *
 * @param {HydratedDocument<Filter>} filter - A user's filter
 * @returns {FilterResponse} - The filter object formatted for the front end
 */
const constructFilterResponse = (filter: HydratedDocument<Filter>): FilterResponse => {
  const filterCopy: Filter = {
    ...filter.toObject({
      versionKey: false
    })
  };

  let status_str = '';
  if (filterCopy.status) {
    status_str = 'on';
  } else {
    status_str = 'off';
  }

  return {
    username: filterCopy.user.username,
    status: status_str
  };
};

export {
  constructFilterResponse
};
