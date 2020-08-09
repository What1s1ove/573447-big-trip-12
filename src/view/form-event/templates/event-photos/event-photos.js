const createEventPhotosTemplate = (photos) => `
  <div class="event__photos-container">
    <div class="event__photos-tape">
      ${photos
        .map((it) => `<img class="event__photo" src="${it}" alt="Event photo">`)
        .join(``)}
    </div>
  </div>
`;

export {createEventPhotosTemplate};
