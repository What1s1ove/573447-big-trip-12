import flatpickr from 'flatpickr';
import {getPathLabel, getFormattedDate} from '~/helpers';
import {DateFormatType} from '~/common/enums';
import {eventTypeToTextMap} from '~/common/map';
import Smart from '~/view/smart/smart';
import {createEventKindsTemplate} from './templates/event-kinds/event-kinds';
import {createEventOffersTemplate} from './templates/event-offers/event-offers';
import {createEventPhotosTemplate} from './templates/event-photos/event-photos';
import {
  getDestinationCities,
  getMatchedDestination,
  getDestinationsPattern,
  resetDatepicker,
  getRawEvent,
  getClearEvent,
  getTripOfferByType,
  getOfferByTitle,
  toggleEventOffers,
} from './helpers';
import {EMPTY_EVENT, FLATPICKR_OPTIONS, EventFormMode} from './common';

class FormEvent extends Smart {
  constructor({event, destinations, offers}) {
    super();
    this._data = FormEvent.parseEventToData(event || EMPTY_EVENT);
    this._mode = event ? EventFormMode.EDITING : EventFormMode.CREATING;
    this._destinations = destinations;
    this._offers = offers;

    this._tripOffer = getTripOfferByType(this._offers, this._data.type);
    this._datepickerStartDate = null;
    this._datepickerEndDate = null;

    this._restoreListeners = this._restoreListeners.bind(this);
    this._initInnerListeners = this._initInnerListeners.bind(this);
    this._setDatepicker = this._setDatepicker.bind(this);
    this._onOffersChange = this._onOffersChange.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onFavoriteChange = this._onFavoriteChange.bind(this);
    this._onDestinationInput = this._onDestinationInput.bind(this);
    this._onPriceInput = this._onPriceInput.bind(this);
    this._onEventTypeChange = this._onEventTypeChange.bind(this);
    this._onEventStartDateChange = this._onEventStartDateChange.bind(this);
    this._onEventEndDateChange = this._onEventEndDateChange.bind(this);
    this._onDeleteClick = this._onDeleteClick.bind(this);
    this._onCloseClick = this._onCloseClick.bind(this);

    this._restoreListeners();
  }

  get template() {
    const {
      type,
      price,
      start,
      end,
      offers,
      destination,
      isFavorite,
      isSaving,
      isDeleting,
      isDisabled
    } = this._data;

    const isEditMode = this._mode === EventFormMode.EDITING;

    const pathLabel = getPathLabel(type);
    const destinationCities = getDestinationCities(this._destinations);
    const destinationPattern = getDestinationsPattern(destinationCities);
    const eventStartDate = start ? getFormattedDate(DateFormatType.FULL_YEAR_TIME, start) : ``;
    const eventEndDate = end ? getFormattedDate(DateFormatType.FULL_YEAR_TIME, end) : ``;

    return `
      <form class="trip-events__item event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input
              class="event__type-toggle
              visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
              ${isDisabled ? `disabled` : ``}
            >
            ${createEventKindsTemplate(type)}
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${eventTypeToTextMap[type]} ${pathLabel}
            </label>
            <input
              value="${destination ? destination.city : ``}"
              pattern="${destinationPattern}"
              ${isDisabled ? `disabled` : ``}
              class="event__input event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              list="destination-list-1"
              required
            >
            <datalist id="destination-list-1">
              ${destinationCities.reduce((template, city) => (template.concat(`<option value="${city}" />`)), ``)}
            </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input
              value="${eventStartDate}"
              ${isDisabled ? `disabled` : ``}
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              required
            >
            —
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input
              value="${eventEndDate}"
              ${isDisabled ? `disabled` : ``}
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              required
            >
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input
              value="${price}"
              ${isDisabled ? `disabled` : ``}
              class="event__input event__input--price"
              id="event-price-1"
              type="number"
              name="event-price"
              required
            >
          </div>
          <button
            ${isDisabled ? `disabled` : ``}
            class="event__save-btn  btn  btn--blue"
            type="submit"
          >
            ${isSaving ? `Saving...` : `Save`}
          </button>
          ${isEditMode ? `
            <button
              ${isDisabled ? `disabled` : ``}
              class="event__reset-btn" type="reset"
            >
              ${isDeleting ? `Deleting...` : `Delete`}
            </button>
            <input
              ${isFavorite ? `checked` : ``}
              ${isDisabled ? `disabled` : ``}
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
            </button>` : `
            <button
              ${isDisabled ? `disabled` : ``}
              class="event__reset-btn" type="reset"
            >
              Cancel
            </button>`}
        </header>
        <section class="event__details">
          ${this._tripOffer.offers.length ? createEventOffersTemplate(this._tripOffer.offers, offers, isDisabled) : ``}
          ${destination ? `
            <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${destination.description}</p>
              ${createEventPhotosTemplate(destination.photos)}
            </section>` : ``}
        </section>
      </form>
    `;
  }

  setOnDeleteClick(callback) {
    this._callbacks.onDeleteClick = callback;

    const deleteBtnNode = this.node.querySelector(`.event__reset-btn`);

    deleteBtnNode.addEventListener(`click`, this._onDeleteClick);
  }

  setOnSubmit(callback) {
    this._callbacks.onSubmit = callback;

    this.node.addEventListener(`submit`, this._onFormSubmit);
  }

  setOnFavoriteChange(callback) {
    this._callbacks.onFavoriteChange = callback;

    const favoriteBtnNode = this.node.querySelector(`.event__favorite-checkbox`);

    favoriteBtnNode.addEventListener(`change`, this._onFavoriteChange);
  }


  setOnCloseClick(callback) {
    this._callbacks.onCloseClick = callback;

    const closeBtnNode = this.node.querySelector(`.event__rollup-btn`);

    closeBtnNode.addEventListener(`click`, this._onCloseClick);
  }

  reset(event) {
    this.updateData(
        FormEvent.parseEventToData(event)
    );
  }

  _restoreListeners() {
    const isEditMode = this._mode === EventFormMode.EDITING;
    this._initInnerListeners();

    this.setOnSubmit(this._callbacks.onSubmit);
    this.setOnDeleteClick(this._callbacks.onDeleteClick);
    this._setDatepicker();

    if (isEditMode) {
      this.setOnFavoriteChange(this._callbacks.onFavoriteChange);
      this.setOnCloseClick(this._callbacks.onCloseClick);
    }
  }

  _initInnerListeners() {
    const destinationInputNode = this.node.querySelector(`.event__input--destination`);
    const typeListNode = this.node.querySelector(`.event__type-list`);
    const priceInputNode = this.node.querySelector(`.event__input--price`);
    const offersNode = this.node.querySelector(`.event__available-offers`);

    destinationInputNode.addEventListener(`input`, this._onDestinationInput);
    typeListNode.addEventListener(`change`, this._onEventTypeChange);
    priceInputNode.addEventListener(`input`, this._onPriceInput);

    if (offersNode) {
      offersNode.addEventListener(`change`, this._onOffersChange);
    }
  }

  _setDatepicker() {
    resetDatepicker(this._datepickerStartDate);
    resetDatepicker(this._datepickerEndDate);

    const eventStartTimeNode = this.node.querySelector(`#event-start-time-1`);
    const eventEndTimeNode = this.node.querySelector(`#event-end-time-1`);

    this._datepickerStartDate = flatpickr(
        eventStartTimeNode,
        Object.assign({}, FLATPICKR_OPTIONS, {
          defaultDate: this._data.start,
          onChange: this._onEventStartDateChange,
        })
    );

    this._datepickerEndDate = flatpickr(
        eventEndTimeNode,
        Object.assign({}, FLATPICKR_OPTIONS, {
          minDate: this._data.start,
          defaultDate: this._data.end,
          onChange: this._onEventEndDateChange,
        })
    );
  }

  _onDestinationInput({target}) {
    const destination = getMatchedDestination(target.value, this._destinations);

    if (!destination) {
      return;
    }

    this.updateData({
      destination,
    });
  }

  _onEventTypeChange({target}) {
    const {value} = target;

    this._tripOffer = getTripOfferByType(this._offers, value);

    this.updateData({
      type: value,
      offers: [],
    });
  }

  _onOffersChange({target}) {
    const offerByTitle = getOfferByTitle(this._tripOffer.offers, target.value);
    const toggledEventOffers = toggleEventOffers(this._data.offers, offerByTitle);

    this.updateData({
      offers: toggledEventOffers,
    });
  }

  _onPriceInput({target}) {
    this.updateData({
      price: target.valueAsNumber
    }, true);
  }

  _onEventStartDateChange([date]) {
    this.updateData({
      start: date
    });
  }

  _onEventEndDateChange([date]) {
    this.updateData({
      end: date
    });
  }

  _onFavoriteChange() {
    this._callbacks.onFavoriteChange();
  }

  _onCloseClick() {
    this._callbacks.onCloseClick();
  }

  _onDeleteClick(evt) {
    evt.preventDefault();

    this._callbacks.onDeleteClick(FormEvent.parseDataToEvent(this._data));
  }

  _onFormSubmit(evt) {
    evt.preventDefault();
    this._callbacks.onSubmit(FormEvent.parseDataToEvent(this._data));
  }

  static parseEventToData(event) {
    const parsedData = getRawEvent(event);

    return parsedData;
  }

  static parseDataToEvent(event) {
    const parsedEvent = getClearEvent(event);

    return parsedEvent;
  }
}

export default FormEvent;
