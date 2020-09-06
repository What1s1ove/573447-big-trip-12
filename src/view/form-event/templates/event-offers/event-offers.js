const createEventOffersTemplate = (eventType, offers, isDisabled) => {

  const offerTemplates = offers.reduce((acc, it, idx) => (acc += `
    <div class="event__offer-selector">
      <input
        id="event-offer-${eventType}${idx}"
        type="checkbox"
        name="event-offer-${eventType}"
        ${it.isChecked ? `checked` : ``}
        ${isDisabled ? `disabled` : ``}
        class="event__offer-checkbox visually-hidden"
      >
      <label class="event__offer-label" for="event-offer-${eventType}${idx}">
        <span class="event__offer-title">${it.title}</span>
        +
        €&nbsp;<span class="event__offer-price">${it.price}</span>
      </label>
    </div>
  `), ``);

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
