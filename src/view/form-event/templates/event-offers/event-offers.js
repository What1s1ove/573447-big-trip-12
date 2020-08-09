const createEventOffersTemplate = (offers) => {
  const offerTemplates = offers.map((it) => `
    <div class="event__offer-selector">
      <input
        id="event-offer-${it.type}-1"
        type="checkbox" name="event-offer-${it.type}"
        ${it.isChecked ? `checked` : ``}
        class="event__offer-checkbox visually-hidden"
      >
      <label class="event__offer-label" for="event-offer-${it.type}-1">
        <span class="event__offer-title">${it.title}</span>
        +
        €&nbsp;<span class="event__offer-price">${it.price}</span>
      </label>
    </div>
  `).join(``);

  return `
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offerTemplates}
      </div>
    </section>
  `;
};

export {createEventOffersTemplate};
