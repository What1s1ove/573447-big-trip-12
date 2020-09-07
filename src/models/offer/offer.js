import {Observer} from '~/helpers';

class Offers extends Observer {
  constructor() {
    super();

    this._offers = [];
  }

  set offers(destinations) {
    this._offers = destinations.slice();
  }

  get offers() {
    return this._offers;
  }
}

export default Offers;
