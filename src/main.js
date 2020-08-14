import {
  renderTemplate,
  renderElement,
  generateEvents,
  getUniqueTripDays,
  getFixedDate,
  getSortedDates,
  getUniqueCities,
  getTotalPrice,
} from '~/helpers';
import {RenderPosition, SortOrder} from '~/common/enums';
import DestinationInfoView from '~/view/destination-info/destination-info';
import TripPriceView from '~/view/trip-price/trip-price';
import {createSiteMenuTemplate} from '~/view/site-menu/site-menu';
import {createFilterTemplate} from '~/view/filter/filter';
import {createFormSortTemplate} from '~/view/form-sort/form-sort';
import {createFormEventTemplate} from '~/view/form-event/form-event';
import {createTripDaysTemplate} from '~/view/trip-days/trip-days';
import {createTripDayTemplate} from '~/view/trip-day/trip-day';
import {createEventTemplate} from '~/view/event/event';

const EVENTS_COUNT = 20;

const events = generateEvents(EVENTS_COUNT);
const tripDays = getUniqueTripDays(events);
const cities = getUniqueCities(events);
const sortedStartDays = getSortedDates(SortOrder.DESK, tripDays.start);
const totalPrice = getTotalPrice(events);

const destinationInfoNode = new DestinationInfoView(cities, tripDays).node;
const tripPriceNode = new TripPriceView(totalPrice).node;

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

renderElement(tripMaiNode, destinationInfoNode, RenderPosition.AFTER_BEGIN);

const tripInfoNode = tripMaiNode.querySelector(`.trip-info`);

renderElement(tripInfoNode, tripPriceNode, RenderPosition.BEFORE_END);

renderTemplate(
    menuTitleNode,
    createSiteMenuTemplate(),
    RenderPosition.AFTER_END
);

renderTemplate(
    filterTitleNode,
    createFilterTemplate(),
    RenderPosition.AFTER_END
);

renderTemplate(
    eventsContainerNode,
    createFormSortTemplate(),
    RenderPosition.BEFORE_END
);

renderTemplate(
    eventsContainerNode,
    createFormEventTemplate(events[0]),
    RenderPosition.BEFORE_END
);

renderTemplate(
    eventsContainerNode,
    createTripDaysTemplate(),
    RenderPosition.BEFORE_END
);

const tripDaysNode = eventsContainerNode.querySelector(`.trip-days`);

sortedStartDays.forEach((day, idx) => {
  const tripDayNumber = idx + 1;

  renderTemplate(
      tripDaysNode,
      createTripDayTemplate(new Date(day), tripDayNumber),
      RenderPosition.BEFORE_END
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
          RenderPosition.BEFORE_END
      )
    );
});
