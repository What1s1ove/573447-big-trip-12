import {EventType} from '~/common/enums';

const EMPTY_EVENT = {
  type: EventType.TAXI,
  price: ``,
  start: ``,
  end: ``,
  offers: [],
  destination: null,
  isFavorite: false,
};

const EventFormMode = {
  CREATING: `creating`,
  EDITING: `editing`,
};

// ! because of camelcase eslint rule
const FLATPICKR_OPTIONS = {
  'allowInput': true,
  'altInput': true,
  'enableTime': true,
  'altFormat': `d/m/y H:i`,
  'time_24hr': true,
};

export {EMPTY_EVENT, EventFormMode, FLATPICKR_OPTIONS};
