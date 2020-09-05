const createEventPhotosTemplate = (photos) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.reduce(
      (acc, it) => (acc += `
        <img class="event__photo" src="${it.src}" loading="lazy" alt="${it.description}">
      `), ``)}
    </div>
  </div>
`;

export {createEventPhotosTemplate};
