const getTripOfferByType = (offers, type) => {
  const offerByType = offers.find((it) => it.type === type);

  return offerByType;
};

export {getTripOfferByType};
