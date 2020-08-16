import {EventSortType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

class Sort extends Abstract {
  constructor(sorts) {
    super();
    this._sorts = sorts;
    this._activeSort = EventSortType.EVENT;
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
                value="sort-${it}"
                ${it === this._activeSort ? `checked` : ``}
                class="trip-sort__input  visually-hidden"
                type="radio"
                name="trip-sort"
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
}

export default Sort;
