import {createElement} from '~/helpers';

class TripDays {
  constructor() {
    this._element = null;
  }

  get node() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    return `
      <section class="trip-main__trip-info trip-info"></section>
    `;
  }
}

export default TripDays;
