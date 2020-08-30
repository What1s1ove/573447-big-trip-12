import {Observer} from '~/helpers';

class Destinations extends Observer {
  constructor() {
    super();

    this._destinations = [];
  }

  set destinations(destinations) {
    this._destinations = destinations.slice();
  }

  get destinations() {
    return this._destinations;
  }
}

export default Destinations;
