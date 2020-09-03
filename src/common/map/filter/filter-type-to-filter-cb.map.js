import {EventFilterType} from '~/common/enums';
import {filterEventsByFutureCb, filterEventsByPastCb} from '~/helpers';

const FilterTypeToFilterCbMap = {
  [EventFilterType.EVERYTHING]: (events) => events,
  [EventFilterType.FUTURE]: (events) => events.filter(filterEventsByFutureCb),
  [EventFilterType.PAST]: (events) => events.filter(filterEventsByPastCb),
};

export {FilterTypeToFilterCbMap};
