import {getUniqueDates, getSideDates, getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';

const createDestinationInfoTemplate = (cities, tripDays) => {
  const uniquesDates = getUniqueDates([...tripDays.start, ...tripDays.end]);
  const {min, max} = getSideDates(uniquesDates);

  const startSideDate = getFormattedDate(DateFormatType.SHORT_MONTH_DAY, min);
  const endSideDate =
    min.getMonth() !== max.getMonth()
      ? getFormattedDate(DateFormatType.SHORT_MONTH_DAY, max)
      : max.getDate();

  return `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${cities.join(` — `)}</h1>
        <p class="trip-info__dates">
          ${startSideDate}
          &nbsp;&mdash;&nbsp;
          ${endSideDate}
        </p>
      </div>
    </section>
  `;
};

export {createDestinationInfoTemplate};
