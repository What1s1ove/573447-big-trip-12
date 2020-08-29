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

const mapEventInitialOffers = (tripOffer) => {
  const mappedEventInitialOffers = tripOffer.map((it) =>
    Object.assign({isChecked: false}, it)
  );

  return mappedEventInitialOffers;
};

export {
  getDestinationCities,
  getMatchedDestination,
  getDestinationsPattern,
  mapEventInitialOffers,
};
