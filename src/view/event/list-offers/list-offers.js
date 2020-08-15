const OffersCount = {
  MIN: 0,
  MAX: 3,
};

const createListOffersTemplate = (offerList) => {
  const offers = offerList
    .reduce((acc, it) =>
      it.isChecked
        ?
        (acc.concat(`
          <li class="event__offer">
            <span class="event__offer-title">${it.title}</span>
            +
            €&nbsp;<span class="event__offer-price">${it.price}</span>
          </li>
        `))
        : acc, ``)
    .slice(OffersCount.MIN, OffersCount.MAX);

  return `
    <ul class="event__selected-offers">
      ${offers}
    </ul>
  `;
};

export {createListOffersTemplate};
