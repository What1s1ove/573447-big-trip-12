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
  const cities = destinations.map((it) => it.city);

  return cities;
};

const getMatchedDestination = (inputValue, destinations) => {
  const destination = destinations.find((it) => it.city === inputValue);

  return destination;
};

const getDestinationsPattern = (cities) => {
  const destinationsPattern = `^(${cities.join(`|`)})$`;

  return destinationsPattern;
};

const getTripOfferByType = (offers, type) => {
  const offerByType = offers.find((it) => it.type === type);

  return offerByType;
};

const getOfferByTitle = (offers, title) => {
  const offerByTitle = offers.find((it) => it.title === title);

  return offerByTitle;
};

const toggleEventOffers = (eventOffers, newOffer) => {
  const hasAlreadyOffer = eventOffers.some((it) => it.title === newOffer.title);

  const toggledEventOffers = hasAlreadyOffer
    ? eventOffers.filter((it) => it.title !== newOffer.title)
    : [...eventOffers, newOffer];

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
