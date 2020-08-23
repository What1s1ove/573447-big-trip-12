import {getPathLabel, getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import {eventTypeToTextMap} from '~/common/map';
import Smart from '~/view/smart/smart';
import {createEventKindsTemplate} from './templates/event-kinds/event-kinds';
import {createEventOffersTemplate} from './templates/event-offers/event-offers';
import {createEventPhotosTemplate} from './templates/event-photos/event-photos';
import {EMPTY_EVENT, EventFormMode} from './common';

class FormEvent extends Smart {
  constructor(event, cities) {
    super();
    this._data = event || EMPTY_EVENT;
    this._mode = event ? EventFormMode.EDITING : EventFormMode.CREATING;
    this._cities = cities;

    this._onSubmit = this._onSubmit.bind(this);
    this._restoreHandlers = this._restoreHandlers.bind(this);
    this._initInnerHandlers = this._initInnerHandlers.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);

    this._restoreHandlers();
  }

  get template() {
    const {
      type,
      city,
      description,
      price,
      start,
      end,
      offers,
      photos,
      isFavorite
    } = this._data;

    const isEditMode = this._mode === EventFormMode.EDITING;

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
          ${isEditMode ? `
            <input
              ${isFavorite ? `checked` : ``}
              class="event__favorite-checkbox  visually-hidden"
              id="event-favorite-1"
              type="checkbox"
              name="event-favorite"
            >
            <label class="event__favorite-btn" for="event-favorite-1">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </label>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Close event</span>
            </button>` : ``}
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

  _restoreHandlers() {
    this._initInnerHandlers();
  }

  _initInnerHandlers() {
    const favoriteBtn = this.node.querySelector(`.event__favorite-checkbox`);

    favoriteBtn.addEventListener(`change`, this._onFavoriteChange);
  }

  _onFavoriteChange() {
    this.updateData({
      isFavorite: !this._data.isFavorite
    });
  }

  _onSubmit(evt) {
    evt.preventDefault();

    this._callbacks.onSubmit(this._data);
  }

  setOnSubmit(callback) {
    const formNode = this.node;

    this._callbacks.onSubmit = callback;

    formNode.addEventListener(`submit`, this._onSubmit);
  }
}

export default FormEvent;
