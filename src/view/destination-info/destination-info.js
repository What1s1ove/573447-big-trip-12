import {getUniqueDates, getSideDates, getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

class DestinationInfo extends Abstract {
  constructor(destinations, tripDays) {
    super();
    this._destinations = destinations;
    this._tripDays = tripDays;
  }

  get template() {
    const cities = this._destinations.map((it) => it.city);
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
        <h1 class="trip-info__title">${cities.join(` — `)}</h1>
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
