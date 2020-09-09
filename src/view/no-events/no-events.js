import Abstract from '~/view/abstract/abstract';

class NoEvents extends Abstract {
  get template() {
    return `
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }
}

export default NoEvents;
