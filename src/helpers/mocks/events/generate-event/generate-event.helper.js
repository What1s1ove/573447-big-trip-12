import {getRandomId} from '~/helpers/id';
import {getRandomNumber} from '~/helpers/number';
import {generateEventType} from '../generate-event-type/generate-event-type.helper';
import {generateEventDate} from '../generate-event-date/generate-event-date.helper';
import {generateEventOffers} from '../generate-event-offers/generate-event-offers.helper';

const EventPrice = {
  MIN: 30,
  MAX: 140,
};

const generateEvent = (destination, tripOffers) => {
  const dates = generateEventDate();
  const type = generateEventType();
  const offers = generateEventOffers(type, tripOffers);

  return {
    type,
    destination,
    offers,
    id: getRandomId(),
    price: getRandomNumber(EventPrice.MIN, EventPrice.MAX),
    start: dates.startDate,
    end: dates.endDate,
    isFavorite: Boolean(getRandomNumber(0, 1)),
  };
};

export {generateEvent};
