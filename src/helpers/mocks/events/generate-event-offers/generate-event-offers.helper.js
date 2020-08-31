import {getRandomNumber} from '~/helpers/number';
import {getTripOfferByType} from '~/helpers/trip';

const generateEventOffers = (eventType, offers) => {
  const currentOffer = getTripOfferByType(offers, eventType);

  const mapOffers = currentOffer.offers.map((it) =>
    Object.assign({}, {isChecked: Boolean(getRandomNumber(0, 1))}, it)
  );

  return mapOffers;
};

export {generateEventOffers};
