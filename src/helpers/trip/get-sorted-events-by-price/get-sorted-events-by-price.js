import {SortOrder} from '~/common/enums';
import {getSortedEntities} from '../../array';

const compareFunksMap = {
  [SortOrder.ASC]: (a, b) => a.price - b.price,
  [SortOrder.DESK]: (a, b) => b.price - a.price,
};

const getSortedEventsByPrice = (sortDir, events) => {
  const sortedEvents = getSortedEntities(events, compareFunksMap[sortDir]);

  return sortedEvents;
};

export {getSortedEventsByPrice};
