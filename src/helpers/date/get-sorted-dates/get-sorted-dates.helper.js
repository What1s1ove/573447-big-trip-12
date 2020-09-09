import {SortOrder} from '~/common/enums';
import {getSortedEntities} from '../../array';

const compareFnMap = {
  [SortOrder.ASC]: (a, b) => new Date(a) - new Date(b),
  [SortOrder.DESK]: (a, b) => new Date(b) - new Date(a),
};

const getSortedDates = (sortDir, dates) => {
  const sortedDates = getSortedEntities(dates, compareFnMap[sortDir]);

  return sortedDates;
};

export {getSortedDates};
