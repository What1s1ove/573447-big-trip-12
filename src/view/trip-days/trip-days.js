import Abstract from '~/view/abstract/abstract';

class TripDays extends Abstract {
  get template() {
    return `
      <ul class="trip-days"></ul>
    `;
  }
}

export default TripDays;
