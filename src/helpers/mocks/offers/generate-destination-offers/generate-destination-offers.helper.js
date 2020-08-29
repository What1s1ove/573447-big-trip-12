import {generateDestinationOffer} from '../generate-destination-offer/generate-destination-offer.helper';

const generateDestinationOffers = (types) => {
  const destinationOffers = types.map((it) => generateDestinationOffer(it));

  return destinationOffers;
};

export {generateDestinationOffers};
