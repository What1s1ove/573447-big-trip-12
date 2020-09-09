const MAX_OFFER_COUNT = 3;

const createListOffersTemplate = (offerList) => {
  const offers = offerList
    .reduce(
        (templates, offer) =>
          templates.length < MAX_OFFER_COUNT
            ? [
              ...templates, `
              <li class="event__offer">
                <span class="event__offer-title">
                  ${offer.title}
                </span>
                +€&nbsp;
                <span class="event__offer-price">
                  ${offer.price}
                </span>
              </li>`,
            ]
            : templates,
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
