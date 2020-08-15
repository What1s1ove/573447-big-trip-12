import {createElement} from '~/helpers';

class DestinationInfo {
  constructor(price) {
    this.price = price;
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
      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${this.price}</span>
      </p>
    `;
  }
}

export default DestinationInfo;
