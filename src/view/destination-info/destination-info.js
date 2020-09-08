import {getUniqueDates, getSideDates, getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';
import {getCitiesLabel} from './helpers';

class DestinationInfo extends Abstract {
  constructor({cities, tripDays}) {
    super();
    this._cities = cities;
    this._tripDays = tripDays;
  }

  get template() {
    const uniquesDates = getUniqueDates([
      ...this._tripDays.start,
      ...this._tripDays.end,
    ]);
    const {min, max} = getSideDates(uniquesDates);

    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getCitiesLabel(this._cities)}</h1>
        <p class="trip-info__dates">
          ${getFormattedDate(DateFormatType.SHORT_MONTH_DAY, min)}
          &nbsp;&mdash;&nbsp;
          ${getFormattedDate(DateFormatType.SHORT_MONTH_DAY, max)}
        </p>
      </div>
    `;
  }
}

export default DestinationInfo;
