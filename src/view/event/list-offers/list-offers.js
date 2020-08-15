const MAX_OFFER_COUNT = 3;

const createListOffersTemplate = (offerList) => {
  const offers = offerList
    .reduce((acc, it, idx) => {
      const isAllow = it.isChecked && (idx + 1 <= MAX_OFFER_COUNT);


      return isAllow ?
        ([...acc, `
          <li class="event__offer">
            <span class="event__offer-title">
              ${it.title}
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
