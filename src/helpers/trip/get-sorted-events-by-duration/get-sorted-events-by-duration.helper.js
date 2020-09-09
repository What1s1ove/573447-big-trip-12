import {SortOrder} from '~/common/enums';
import {getSortedEntities} from '../../array';
import {getTimeDiff} from '../../date';


const compareFunksMap = {
  [SortOrder.ASC]: (a, b) => getTimeDiff(a.start, a.end) - getTimeDiff(b.start, b.end),
  [SortOrder.DESK]: (a, b) => getTimeDiff(b.start, b.end) - getTimeDiff(a.start, a.end),
};

const getSortedEventsByDuration = (sortDir, events) => {
  const sortedEvents = getSortedEntities(events, compareFunksMap[sortDir]);

  return sortedEvents;
};

export {getSortedEventsByDuration};
