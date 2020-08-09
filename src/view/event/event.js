import {
  getDurationTime,
  getFormattedTime,
  getPathLabel,
} from '~/helpers';
import {eventTypeToTextMap} from '~/common/map';
import {createListOffersTemplate} from './list-offers/list-offers';
import {TimeFormatType} from '~/common/enums';

const createEventTemplate = (event) => {
  const {city, type, price, start, end, offers} = event;

  const pathLabel = getPathLabel(type);
  const duration = getDurationTime(start, end);

  return `
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">
          ${eventTypeToTextMap[type]} ${pathLabel} ${city}
        </h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${start.toISOString()}">
              ${getFormattedTime(TimeFormatType.SHORT, start)}
            </time>
            —
            <time class="event__end-time" datetime="${end.toISOString()}">
              ${getFormattedTime(TimeFormatType.SHORT, end)}
            </time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>
        <p class="event__price">
          €&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createListOffersTemplate(offers)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>
  `;
};

export {createEventTemplate};
