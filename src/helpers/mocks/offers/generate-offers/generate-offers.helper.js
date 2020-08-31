import {getRandomNumber} from '~/helpers/number';

const EventOffer = {
  MIN_OFFERS_COUNT: 1,
  PRICE: {
    MIN: 10,
    MAX: 50,
  },
  TITLES: [`Add luggage`, `Add breakfast`, `Book tickets`, `Rent a car`],
};

const generateOffers = () => {
  const offerCount = getRandomNumber(EventOffer.MIN_OFFERS_COUNT, EventOffer.TITLES.length);

  const offers = Array.from(new Array(offerCount), (_, idx) => ({
    name: EventOffer.TITLES[idx],
    price: getRandomNumber(EventOffer.PRICE.MIN, EventOffer.PRICE.MAX),
  }));

  return offers;
};

export {generateOffers};
