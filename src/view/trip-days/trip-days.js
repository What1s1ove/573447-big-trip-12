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
      <ul class="trip-days"></ul>
    `;
  }
}

export default TripDays;
