import {Observer} from '~/helpers';
import {EventFilerType} from '~/common/enums';

class Filter extends Observer {
  constructor() {
    super();

    this._activeFilter = EventFilerType.EVERYTHING;
  }

  setOffers(updateType, filter) {
    this._activeFilter = filter;

    this._notify(updateType, filter);
  }

  get offers() {
    return this._offers;
  }
}

export default Filter;
