import {getPathLabel, getFormattedDate, createElement} from '~/helpers';
import {EventType, DateFormatType} from '~/common/enums';
import {eventTypeToTextMap} from '~/common/map';
import {createEventKindsTemplate} from './templates/event-kinds/event-kinds';
import {createEventOffersTemplate} from './templates/event-offers/event-offers';
import {createEventPhotosTemplate} from './templates/event-photos/event-photos';
import {EMPTY_EVENT} from './common';

class FormEvent {
  constructor(event = EMPTY_EVENT, cities) {
    this._event = event;
    this._cities = cities;
    this._element = null;
  }

  get node() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  get template() {
    const {
      type = EventType.TAXI,
      city = ``,
      description = ``,
      price = ``,
      start = ``,
      end = ``,
      offers = [],
      photos = [],
    } = this._event;

    const pathLabel = getPathLabel(type);
    const eventStartDate = start ? getFormattedDate(DateFormatType.FULL_YEAR_TIME, start) : ``;
    const eventEndDate = end ? getFormattedDate(DateFormatType.FULL_YEAR_TIME, end) : ``;

    const eventTypeTemplate = createEventKindsTemplate(type);
    const eventOffersTemplate = createEventOffersTemplate(offers);
    const eventPhotosTemplate = createEventPhotosTemplate(photos);

    return `
      <form class="trip-events__item event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            ${eventTypeTemplate}
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventTypeToTextMap[type]} ${pathLabel}
            </label>
            <input
              value="${city}"
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              list="destination-list-1"
            >
            <datalist id="destination-list-1">
              ${this._cities.reduce((acc, it) => (acc.concat(`<option value="${it}" />`)), ``)}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input
              value="${eventStartDate}"
              class="event__input  event__input--time"
              id="event-start-time-1" type="text"
              name="event-start-time"
            >
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input
              value="${eventEndDate}"
              class="event__input  event__input--time"
              id="event-end-time-1" type="text"
              name="event-end-time"
            >
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${offers.length ? eventOffersTemplate : ``}
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${photos.length ? eventPhotosTemplate : ``}
          </section>
        </section>
      </form>
    `;
  }
}

export default FormEvent;
