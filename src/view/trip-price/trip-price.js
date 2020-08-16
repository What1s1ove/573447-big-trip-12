import Abstract from '~/view/abstract/abstract';

class DestinationInfo extends Abstract {
  constructor(price) {
    super();
    this.price = price;
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
