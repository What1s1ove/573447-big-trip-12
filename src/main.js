import {createDestinationInfoTemplate} from '~/view/destination-info/destination-info';
import {createTripPriceTemplate} from '~/view/trip-price/trip-price';
import {createSiteMenuTemplate} from '~/view/site-menu/site-menu';
import {createFilterTemplate} from '~/view/filter/filter';
import {createFormSortTemplate} from '~/view/form-sort/form-sort';
import {createFormEventTemplate} from '~/view/form-event/form-event';
import {createTripDaysTemplate} from '~/view/trip-days/trip-days';
import {createTripDayTemplate} from '~/view/trip-day/trip-day';
import {createEventTemplate} from '~/view/event/event';
import {
  renderTemplate,
  generateEvents,
  getUniqueCities,
  getUniqueDays,
  getFixedDate,
  getSortedDates,
  getTotalPrice,
} from '~/helpers';
import {AdjacentHTMLPlace} from '~/common/enums';

const EVENTS_COUNT = 20;
const events = generateEvents(EVENTS_COUNT);
const days = getSortedDates(getUniqueDays(events));
const cities = getUniqueCities(events);
const totalPrice = getTotalPrice(events);

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

renderTemplate(
    tripMaiNode,
    createDestinationInfoTemplate(cities),
    AdjacentHTMLPlace.AFTER_BEGIN
);

const tripInfoNode = tripMaiNode.querySelector(`.trip-info`);

renderTemplate(
    tripInfoNode,
    createTripPriceTemplate(totalPrice),
    AdjacentHTMLPlace.BEFORE_END
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
    createFormEventTemplate(events[0]),
    AdjacentHTMLPlace.BEFORE_END
);

renderTemplate(
    eventsContainerNode,
    createTripDaysTemplate(),
    AdjacentHTMLPlace.BEFORE_END
);

const tripDaysNode = eventsContainerNode.querySelector(`.trip-days`);

days.forEach((day, idx) => {
  const tripDayNumber = idx + 1;

  renderTemplate(
      tripDaysNode,
      createTripDayTemplate(new Date(day), tripDayNumber),
      AdjacentHTMLPlace.BEFORE_END
  );

  const eventListNode = tripDaysNode.querySelectorAll(`.trip-events__list`);

  events
    .slice(1)
    .filter(
        (event) =>
          getFixedDate(event.start).getTime() === getFixedDate(day).getTime()
    )
    .forEach((it) =>
      renderTemplate(
          eventListNode[idx],
          createEventTemplate(it),
          AdjacentHTMLPlace.BEFORE_END
      )
    );
});
