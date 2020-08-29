const MAX_OFFER_COUNT = 3;

const createListOffersTemplate = (offerList) => {
  const offers = offerList
    .reduce((acc, it) => {
      const isAllow = it.isChecked && (acc.length < MAX_OFFER_COUNT);


      return isAllow ?
        ([...acc, `
          <li class="event__offer">
            <span class="event__offer-title">
              ${it.name}
            </span>
            +€&nbsp;
            <span class="event__offer-price">
              ${it.price}
            </span>
          </li>
        `]) : acc;
    }, [])
    .join(``);

  return `
    <ul class="event__selected-offers">
      ${offers}
    </ul>
  `;
};

export {createListOffersTemplate};
