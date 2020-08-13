import {getRandomNumber} from '~/helpers/number';
import {OfferType} from '~/common/enums';
import {getRandomItem} from '~/helpers/array';

const offerTypes = Object.values(OfferType);

const EventOffer = {
  COUNT: {
    MIN: 0,
    MAX: 5,
  },
  PRICE: {
    MIN: 10,
    MAX: 50,
  },
  TITLES: [`Add luggage`, `Add breakfast`, `Book tickets`, `Rent a car`],
};

const generateEventOffers = () => {
  const offerCount = getRandomNumber(
      EventOffer.COUNT.MIN,
      EventOffer.COUNT.MAX
  );

  const offers = Array.from(new Array(offerCount), () => ({
    type: getRandomItem(offerTypes),
    title: getRandomItem(EventOffer.TITLES),
    price: getRandomNumber(EventOffer.PRICE.MIN, EventOffer.PRICE.MAX),
    isChecked: Boolean(getRandomNumber(0, 1)),
  }));

  return offers;
};

export {generateEventOffers};
