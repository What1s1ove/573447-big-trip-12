import {EventFilerType} from '~/common/enums';

const eventEventFilters = Object.values(EventFilerType);

const createFilterTemplate = () => `
  <form class="trip-filters" action="#" method="get">
    ${eventEventFilters
      .map((it) => `
        <div class="trip-filters__filter">
          <input id="filter-${it}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked="">
          <label class="trip-filters__filter-label" for="filter-${it}">${it}</label>
        </div>
      `)
      .join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export {createFilterTemplate};
