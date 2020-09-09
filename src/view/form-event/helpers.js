const getRawEvent = (event) => {
  const rawEvent = Object.assign({}, event, {
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  return rawEvent;
};

const getClearEvent = (event) => {
  const clearEvent = Object.assign({}, event);

  delete clearEvent.isDisabled;
  delete clearEvent.isSaving;
  delete clearEvent.isDeleting;

  return clearEvent;
};

const getDestinationCities = (destinations) => {
  const cities = destinations.map((destination) => destination.city);

  return cities;
};

const getMatchedDestination = (inputValue, destinations) => {
  const matchedDestination = destinations.find((destination) => destination.city === inputValue);

  return matchedDestination;
};

const getDestinationsPattern = (cities) => {
  const destinationsPattern = `^(${cities.join(`|`)})$`;

  return destinationsPattern;
};

const getTripOfferByType = (offers, type) => {
  const offerByType = offers.find((offer) => offer.type === type);

  return offerByType;
};

const getOfferByTitle = (offers, title) => {
  const offerByTitle = offers.find((offer) => offer.title === title);

  return offerByTitle;
};

const toggleEventOffers = (eventOffers, offerToToggle) => {
  const hasSuchOffer = eventOffers.some((offer) => offer.title === offerToToggle.title);

  const toggledEventOffers = hasSuchOffer
    ? eventOffers.filter((offer) => offer.title !== offerToToggle.title)
    : [...eventOffers, offerToToggle];

  return toggledEventOffers;
};

const resetDatepicker = (datepicker) => {
  if (datepicker) {
    datepicker.destroy();
    datepicker = null;
  }
};

export {
  getRawEvent,
  getClearEvent,
  getDestinationCities,
  getMatchedDestination,
  getDestinationsPattern,
  resetDatepicker,
  getTripOfferByType,
  toggleEventOffers,
  getOfferByTitle,
};
