import {getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

class TripDay extends Abstract {
  constructor(date, number) {
    super();
    this._date = date;
    this._number = number;
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

