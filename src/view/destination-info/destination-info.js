import {
  getUniqueDates,
  getSideDates,
  getFormattedDate,
  createElement,
} from '~/helpers';
import {DateFormatType} from '~/common/enums';

class DestinationInfo {
  constructor(cities, tripDays) {
    this.cities = cities;
    this.tripDays = tripDays;
    this._element = null;
  }

  get node() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    const uniquesDates = getUniqueDates([
      ...this.tripDays.start,
      ...this.tripDays.end,
    ]);
    const {min, max} = getSideDates(uniquesDates);

    const startSideDate = getFormattedDate(DateFormatType.SHORT_MONTH_DAY, min);
    const endSideDate = min.getMonth() !== max.getMonth()
      ? getFormattedDate(DateFormatType.SHORT_MONTH_DAY, max)
      : max.getDate();

    return `
      <section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${this.cities.join(` — `)}</h1>
          <p class="trip-info__dates">
            ${startSideDate}
            &nbsp;&mdash;&nbsp;
            ${endSideDate}
          </p>
        </div>
      </section>
    `;
  }
}

export default DestinationInfo;
