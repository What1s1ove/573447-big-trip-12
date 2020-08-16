import {EventType} from '~/common/enums';
import {EVENT_CITIES} from '~/common/constants';

const DEFAULT_EVENT_CITY = EVENT_CITIES[0];

const EMPTY_EVENT = {
  type: EventType.TAXI,
  city: DEFAULT_EVENT_CITY,
  description: ``,
  price: ``,
  start: ``,
  end: ``,
  offers: [],
  photos: [],
  destination: {
    city: DEFAULT_EVENT_CITY,
    photos: [],
    description: ``
  }
};

const EventFormMode = {
  CREATING: `creating`,
  EDITING: `editing`,
};

export {EMPTY_EVENT, EventFormMode};
