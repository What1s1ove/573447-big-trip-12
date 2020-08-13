const createTripPriceTemplate = (price) => `
  <p class="trip-info__cost">
    Total: €&nbsp;<span class="trip-info__cost-value">${price}</span>
  </p>
`;

export {createTripPriceTemplate};
