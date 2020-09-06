import Abstract from '~/view/abstract/abstract';

class Loader extends Abstract {
  get template() {
    return `
      <section class="trip-events">
        <h2 class="visually-hidden">Trip events</h2>
        <p class="trip-events__msg">Loading...</p>
      </section>
    `;
  }
}

export default Loader;
