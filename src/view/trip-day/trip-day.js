import {getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

class TripDay extends Abstract {
  constructor(date, number) {
    super();
    this._date = date ? new Date(date) : null;
    this._number = number || null;
  }

  get template() {
    return `
      <li class="trip-days__item  day">
        <div class="day__info">
          ${this._date ? `
            <span class="day__counter">${this._number}</span>
            <time class="day__date" datetime="${this._date.toISOString()}">
              ${getFormattedDate(DateFormatType.SHORT_MONTH_DAY, this._date)}
            </time>` : ``}
        </div>
      </li>
    `;
  }
}

export default TripDay;

