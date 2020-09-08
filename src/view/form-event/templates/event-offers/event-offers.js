import {checkIsOfferSelected} from './helpers';

const createEventOffersTemplate = (offersByType, eventOffers, isDisabled) => {
  const offerTemplates = offersByType.reduce((acc, it, idx) => (acc += `
    <div class="event__offer-selector">
      <input
        id="event-offer-${idx}"
        ${isDisabled ? `disabled` : ``}
        ${checkIsOfferSelected(eventOffers, it) ? `checked` : ``}
        value="${it.title}"
        type="checkbox"
        name="event-offer"
        class="event__offer-checkbox visually-hidden"
      >
      <label class="event__offer-label" for="event-offer-${idx}">
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
