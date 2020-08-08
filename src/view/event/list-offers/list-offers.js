const createListOffersTemplate = (offerList) => {
  const offers = offerList
    .reduce(
        (acc, it) =>
          it.isChecked
            ? [
              ...acc,
              `<li class="event__offer">
                <span class="event__offer-title">${it.title}</span>
                +
                €&nbsp;<span class="event__offer-price">${it.price}</span>
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
