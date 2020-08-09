import {getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';

const createTripDayTemplate = (date, number) => `
  <li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${number}</span>
      <time class="day__date" datetime="${date.toISOString()}">
        ${getFormattedDate(DateFormatType.SHORT_MONTH_DAY, date)}
      </time>
    </div>
    <ul class="trip-events__list">
    </ul>
  </li>
`;

export {createTripDayTemplate};
