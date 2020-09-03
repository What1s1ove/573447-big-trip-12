import Abstract from '~/view/abstract/abstract';

class Filter extends Abstract {
  constructor({filters, currentFilter}) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;

    this._onChangeFilter = this._onChangeFilter.bind(this);
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
                ${it === this._currentFilter ? `checked` : ``}
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

  _onChangeFilter({target}) {
    this._callbacks.onChangeFilter(target.value);
  }

  setOnChangeFilter(callback) {
    this._callbacks.onChangeFilter = callback;

    this.node.addEventListener(`change`, this._onChangeFilter);
  }
}

export default Filter;
