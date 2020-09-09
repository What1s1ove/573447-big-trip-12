import {Observer} from '~/helpers';
import {EventFilterType} from '~/common/enums';

class Filter extends Observer {
  constructor() {
    super();

    this._currentFilter = EventFilterType.EVERYTHING;
  }

  get filter() {
    return this._currentFilter;
  }

  setFilter(updateType, filter) {
    this._currentFilter = filter;

    this._notify(updateType, filter);
  }
}

export default Filter;
