import {Observer} from '~/helpers';
import {EventFilterType} from '~/common/enums';

class Filter extends Observer {
  constructor() {
    super();

    this._currentFilter = EventFilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._currentFilter = filter;

    this._notify(updateType, filter);
  }

  get filter() {
    return this._currentFilter;
  }
}

export default Filter;
