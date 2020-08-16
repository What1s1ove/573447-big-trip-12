import {EventFilerType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

class Filter extends Abstract {
  constructor(filters) {
    super();
    this._filters = filters;
    this._activeFilter = EventFilerType.EVERYTHING;
  }

  get template() {
    return `
      <form class="trip-filters" action="#" method="get">
        ${this._filters
          .reduce((acc, it) => (acc.concat(`
            <div class="trip-filters__filter">
              <input
                id="filter-${it}"
                value=${it}
                ${it === this._activeFilter ? `checked` : ``}
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
              >
              <label for="filter-${it}" class="trip-filters__filter-label">${it}</label>
            </div>
          `)), ``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }
}

export default Filter;
