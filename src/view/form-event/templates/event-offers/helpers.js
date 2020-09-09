const checkIsOfferSelected = (eventOffers, offerByType) => {
  const isSelected = eventOffers.some((offer) => offer.title === offerByType.title);

  return isSelected;
};

export {checkIsOfferSelected};
