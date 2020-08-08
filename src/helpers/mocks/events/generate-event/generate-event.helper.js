import {getRandomNumber} from '~/helpers/number';
import {generateEventType} from '../generate-event-type/generate-event-type.helper';
import {generateEventCity} from '../generate-event-city/generate-event-city.helper';
import {generateEventDestination} from '../generate-event-destination/generate-event-destination.helper';
import {generateEventDate} from '../generate-event-date/generate-event-date.helper';
import {generateEventOffers} from '../generate-event-offers/generate-event-offers.helper';

const EventPrice = {
  MIN: 30,
  MAX: 140,
};

const generateEvent = () => {
  const city = generateEventCity();
  const destination = generateEventDestination(city);
  const dates = generateEventDate();

  return {
    city,
    destination,
    description: destination.description,
    photos: destination.photos,
    type: generateEventType(),
    price: getRandomNumber(EventPrice.MIN, EventPrice.MAX),
    offers: generateEventOffers(),
    start: dates.startDate,
    end: dates.endDate,
    isFavorite: Boolean(getRandomNumber(0, 1)),
  };
};

export {generateEvent};
