const MAX_OFFER_COUNT = 3;

const createListOffersTemplate = (offerList) => {
  const offers = offerList
    .reduce(
        (acc, it) =>
          acc.length < MAX_OFFER_COUNT
            ? [
              ...acc, `
              <li class="event__offer">
                <span class="event__offer-title">
                  ${it.title}
                </span>
                +€&nbsp;
                <span class="event__offer-price">
                  ${it.price}
                </span>
              </li>`,
            ]
            : acc,
        []
    )
    .join(``);

  return `
    <ul class="event__selected-offers">
      ${offers}
    </ul>
  `;
};

export {createListOffersTemplate};
