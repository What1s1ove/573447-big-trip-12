const createEventPhotosTemplate = (photos) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos.reduce(
      (acc, it) => (acc += `
        <img class="event__photo" src="${it}" alt="Event photo">
      `), ``)}
    </div>
  </div>
`;

export {createEventPhotosTemplate};
