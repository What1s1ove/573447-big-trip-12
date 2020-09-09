const createEventPhotosTemplate = (photos) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.reduce(
      (template, photo) => (template += `
        <img class="event__photo" src="${photo.src}" loading="lazy" alt="${photo.description}">
      `), ``)}
    </div>
  </div>
`;

export {createEventPhotosTemplate};
