const createDestinationInfoTemplate = (cities) => `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${cities.join(`—`)}</h1>
      <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
    </div>
  </section>
`;

export {createDestinationInfoTemplate};
