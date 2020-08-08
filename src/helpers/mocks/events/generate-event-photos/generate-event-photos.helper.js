const generateEventPhotos = (count) => {
  const photos = Array.from(
      new Array(count),
      () => `http://picsum.photos/248/152?r=${Math.random()}`
  );

  return photos;
};

export {generateEventPhotos};
