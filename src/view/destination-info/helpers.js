const MIN_CITIES_COUNT_FOR_SHOT_LABEL = 3;

const getCitiesShoerLabel = (cities) => {
  const firstCity = cities[0];
  const lastCity = cities[cities.length - 1];

  const citiesShortLabel = `${firstCity} — ... — ${lastCity}`;

  return citiesShortLabel;
};

const getCitiesLabel = (cities) => {
  const citiesLabel =
    cities.length > MIN_CITIES_COUNT_FOR_SHOT_LABEL
      ? getCitiesShoerLabel(cities)
      : cities.join(` — `);

  return citiesLabel;
};

export {getCitiesLabel};
