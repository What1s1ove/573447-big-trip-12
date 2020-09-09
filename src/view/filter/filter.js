import Abstract from '~/view/abstract/abstract';

class Filter extends Abstract {
  constructor({filters, currentFilter}) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilter;

    this._onFilterChange = this._onFilterChange.bind(this);
  }

  get template() {
    return `
      <form class="trip-filters" action="#" method="get">
        ${this._filters
          .reduce((template, filter) => (template.concat(`
            <div class="trip-filters__filter">
              <input
                id="filter-${filter.name}"
                value=${filter.name}
                ${filter.name === this._currentFilter ? `checked` : ``}
                ${filter.isDisabled ? `disabled` : ``}
                class="trip-filters__filter-input  visually-hidden"
                type="radio"
                name="trip-filter"
              >
              <label for="filter-${filter.name}" class="trip-filters__filter-label">${filter.name}</label>
            </div>
          `)), ``)}
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }

  _onFilterChange({target}) {
    this._callbacks.onChangeFilter(target.value);
  }

  setOnChangeFilter(callback) {
    this._callbacks.onChangeFilter = callback;

    this.node.addEventListener(`change`, this._onFilterChange);
  }
}

export default Filter;
