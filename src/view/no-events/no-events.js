import {createElement} from '~/helpers';

class NoEvents {
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
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }
}

export default NoEvents;
