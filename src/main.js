import {createTotalPriceTemplate} from '~/view/total-price';
import {createSiteMenuTemplate} from '~/view/site-menu';
import {createFilterTemplate} from '~/view/filter';
import {createFormSortTemplate} from '~/view/form-sort';
import {createFormEventTemplate} from '~/view/form-event';
import {createTripDaysTemplate} from '~/view/trip-days';
import {createEventTemplate} from '~/view/event';
import {createEventInfoTemplate} from '~/view/event-info';
import {renderTemplate} from '~/helpers';
import {AdjacentHTMLPlace} from '~/common/enums';

const TRIPS_COUNT = 3;

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

renderTemplate(
    tripMaiNode,
    createTotalPriceTemplate(),
    AdjacentHTMLPlace.AFTER_BEGIN
);
renderTemplate(
    menuTitleNode,
    createSiteMenuTemplate(),
    AdjacentHTMLPlace.AFTER_END
);
renderTemplate(
    filterTitleNode,
    createFilterTemplate(),
    AdjacentHTMLPlace.AFTER_END
);
renderTemplate(
    eventsContainerNode,
    createFormSortTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);
renderTemplate(
    eventsContainerNode,
    createFormEventTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);
renderTemplate(
    eventsContainerNode,
    createTripDaysTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);

const eventListNode = eventsContainerNode.querySelector(
    `.trip-days .trip-events__list`
);

for (let i = 0; i < TRIPS_COUNT; i++) {
  renderTemplate(
      eventListNode,
      createEventTemplate(),
      AdjacentHTMLPlace.BEFORE_END
  );
}

renderTemplate(
    eventListNode,
    createEventInfoTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);
