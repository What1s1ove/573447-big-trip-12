import {EventType} from '~/common/enums';

const EMPTY_EVENT = {
  type: EventType.TAXI,
  city: ``,
  description: ``,
  price: ``,
  start: ``,
  end: ``,
  offers: [],
  photos: [],
};

const EventFormMode = {
  CREATING: `creating`,
  EDITING: `editing`,
};

export {EMPTY_EVENT, EventFormMode};
