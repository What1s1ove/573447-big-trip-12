import {getUniqueDates, getSideDates, getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import Abstract from '~/view/abstract/abstract';

class DestinationInfo extends Abstract {
  constructor(cities, tripDays) {
    super();
    this.cities = cities;
    this.tripDays = tripDays;
  }

  get template() {
    const uniquesDates = getUniqueDates([
      ...this.tripDays.start,
      ...this.tripDays.end,
    ]);
    const {min, max} = getSideDates(uniquesDates);

    const startSideDate = getFormattedDate(DateFormatType.SHORT_MONTH_DAY, min);
    const endSideDate =
      min.getMonth() !== max.getMonth()
        ? getFormattedDate(DateFormatType.SHORT_MONTH_DAY, max)
        : max.getDate();

    return `
      <div class="trip-info__main">
        <h1 class="trip-info__title">${this.cities.join(` — `)}</h1>
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
