import {generateOffers} from '../generate-offers/generate-offers.helper';

const generateDestinationOffer = (type) => {
  const offers = generateOffers();

  const destinationOffer = {
    type,
    offers,
  };

  return destinationOffer;
};

export {generateDestinationOffer};
