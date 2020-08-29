import {getRandomNumber} from '~/helpers/number';

const generateEventOffers = (eventType, offers) => {
  const currentOffer = offers.find((it) => it.type === eventType);

  const mapOffers = currentOffer.offers.map((it) =>
    Object.assign({}, {isChecked: Boolean(getRandomNumber(0, 1))}, it)
  );

  return mapOffers;
};

export {generateEventOffers};
