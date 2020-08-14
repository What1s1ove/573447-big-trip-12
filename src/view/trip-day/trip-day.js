import {getFormattedDate, createElement} from '~/helpers';
import {DateFormatType} from '~/common/enums';

class TripDay {
  constructor(date, number) {
    this._date = date;
    this._number = number;
    this._element = null;
  }

  get node() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    const formattedDate = getFormattedDate(DateFormatType.SHORT_MONTH_DAY, this._date);

    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${this._number}</span>
          <time class="day__date" datetime="${this._date.toISOString()}">
            ${formattedDate}
          </time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>
    `;
  }
}

export default TripDay;

