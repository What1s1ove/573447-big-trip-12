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

    const startSideDate = getFormattedDate(DateFormatType.SHORT_MONTH_DAY, min);
    const endSideDate =
      min.getMonth() !== max.getMonth()
        ? getFormattedDate(DateFormatType.SHORT_MONTH_DAY, max)
        : max.getDate();

    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getCitiesLabel(this._cities)}</h1>
        <p class="trip-info__dates">
          ${startSideDate}
          &nbsp;&mdash;&nbsp;
          ${endSideDate}
        </p>
      </div>
    `;
  }
}

export default DestinationInfo;
