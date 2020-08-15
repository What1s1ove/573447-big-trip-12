import {
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
  KeyboardKey,
} from '~/common/enums';
import DestinationInfoView from '~/view/destination-info/destination-info';
import TripPriceView from '~/view/trip-price/trip-price';
import SiteMenuView from '~/view/site-menu/site-menu';
import FilterView from '~/view/filter/filter';
import SortView from '~/view/sort/sort';
import FormEventView from '~/view/form-event/form-event';
import TripDaysView from '~/view/trip-days/trip-days';
import TripDayView from '~/view/trip-day/trip-day';
import EventView from '~/view/event/event';

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
const formEventNode = new FormEventView(null, cities).node;

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

const renderEvent = (listNode, event) => {
  const eventNode = new EventView(event).node;
  const formNode = new FormEventView(event, cities).node;

  const replace = (a, b) => a.replaceWith(b);

  const onEscKeyDown = (evt) => {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();

      replace(formNode, eventNode);

      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventNode.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replace(eventNode, formNode);

    document.addEventListener(`keydown`, onEscKeyDown);
  });

  formNode.addEventListener(`submit`, (evt) => {
    evt.preventDefault();

    replace(formNode, eventNode);

    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(listNode, eventNode, RenderPosition.BEFORE_END);
};

sortedStartDays.forEach((day, idx) => {
  const tripDayNumber = idx + 1;

  const tripDayNode = new TripDayView(new Date(day), tripDayNumber).node;

  renderElement(tripDaysNode, tripDayNode, RenderPosition.BEFORE_END);

  const eventListNode = tripDaysNode.querySelectorAll(`.trip-events__list`);

  events
    .slice(1)
    .filter((event) => {
      const isMathDate = getFixedDate(event.start).getTime() === getFixedDate(day).getTime();

      return isMathDate;
    })
    .forEach((it) => renderEvent(eventListNode[idx], it));
});
