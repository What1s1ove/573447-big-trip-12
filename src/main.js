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
import {
  RenderPosition,
  SortOrder,
  AppNavigation,
  EventFilerType,
  EventSortType,
} from '~/common/enums';
import DestinationInfoView from '~/view/destination-info/destination-info';
import TripPriceView from '~/view/trip-price/trip-price';
import SiteMenuView from '~/view/site-menu/site-menu';
import FilterView from '~/view/filter/filter';
import SortView from '~/view/sort/sort';
import FormEventView from '~/view/form-event/form-event';
import TripDaysView from '~/view/trip-days/trip-days';
import {createTripDayTemplate} from '~/view/trip-day/trip-day';
import {createEventTemplate} from '~/view/event/event';

const EVENTS_COUNT = 20;

const events = generateEvents(EVENTS_COUNT);
const tripDays = getUniqueTripDays(events);
const cities = getUniqueCities(events);
const siteMenuItems = Object.values(AppNavigation);
const filters = Object.values(EventFilerType);
const sorts = Object.values(EventSortType);
const sortedStartDays = getSortedDates(SortOrder.DESK, tripDays.start);
const totalPrice = getTotalPrice(events);

const destinationInfoNode = new DestinationInfoView(cities, tripDays).node;
const tripPriceNode = new TripPriceView(totalPrice).node;
const siteMenuNode = new SiteMenuView(siteMenuItems).node;
const filterNode = new FilterView(filters).node;
const sortNode = new SortView(sorts).node;
const tripDaysNode = new TripDaysView().node;
const formEventNode = new FormEventView(events[0], cities).node;

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

renderElement(tripMaiNode, destinationInfoNode, RenderPosition.AFTER_BEGIN);

const tripInfoNode = tripMaiNode.querySelector(`.trip-info`);

renderElement(tripInfoNode, tripPriceNode, RenderPosition.BEFORE_END);
renderElement(menuTitleNode, siteMenuNode, RenderPosition.AFTER_END);
renderElement(filterTitleNode, filterNode, RenderPosition.AFTER_END);
renderElement(eventsContainerNode, sortNode, RenderPosition.BEFORE_END);
renderElement(eventsContainerNode, formEventNode, RenderPosition.BEFORE_END);
renderElement(eventsContainerNode, tripDaysNode, RenderPosition.BEFORE_END);

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
