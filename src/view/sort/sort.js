import {EventSortType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

const SORT_INPUT_NAME = `trip-sort`;

class Sort extends Abstract {
  constructor(sorts) {
    super();
    this._sorts = sorts;
    this._activeSort = EventSortType.EVENT;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
  }

  get template() {
    return `
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">
          Day
        </span>
        ${this._sorts
          .reduce((acc, it) => (acc.concat(`
            <div class="trip-sort__item  trip-sort__item--${it}">
              <input
                id="sort-${it}"
                value="${it}"
                ${it === this._activeSort ? `checked` : ``}
                class="trip-sort__input  visually-hidden"
                type="radio"
                name="${SORT_INPUT_NAME}"
              >
              <label class="trip-sort__btn" for="sort-${it}">
                ${it}
                <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
                  <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"></path>
                </svg>
              </label>
            </div>
          `)), ``)}
        <span class="trip-sort__item  trip-sort__item--offers">
          Offers
        </span>
      </form>
    `;
  }

  _onSortTypeChange({target}) {
    const {value, name} = target;
    const isSortChange = name.includes(SORT_INPUT_NAME);

    if (!isSortChange) {
      return;
    }

    this._callbacks.changeSortType(value);
  }

  setOnSortTypeChange(callback) {
    this._callbacks.changeSortType = callback;

    this.node.addEventListener(`change`, this._onSortTypeChange);
  }
}

export default Sort;
