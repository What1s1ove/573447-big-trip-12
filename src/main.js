import {
  renderElement,
  replaceWithElement,
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
import TripInfoView from '~/view/trip-info/trip-info';
import TripDaysView from '~/view/trip-days/trip-days';
import TripDayView from '~/view/trip-day/trip-day';
import EventView from '~/view/event/event';
import NoEventsView from '~/view/no-events/no-events';

const EVENTS_COUNT = 20;

const events = generateEvents(EVENTS_COUNT);
const tripDays = getUniqueTripDays(events);
const cities = getUniqueCities(events);
const siteMenuItems = Object.values(AppNavigation);
const filters = Object.values(EventFilerType);
const sorts = Object.values(EventSortType);
const sortedStartDays = getSortedDates(SortOrder.DESK, tripDays.start);
const totalPrice = getTotalPrice(events);

const tripInfoComponent = new TripInfoView();
const tripPriceComponent = new TripPriceView(totalPrice);
const siteMenuComponent = new SiteMenuView(siteMenuItems);
const filterComponent = new FilterView(filters);

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

const renderEvent = (listNode, event) => {
  const eventComponent = new EventView(event);
  const eventFormComponent = new FormEventView(event, cities);

  const onEscKeyDown = (evt) => {
    if (evt.key === KeyboardKey.ESCAPE) {
      evt.preventDefault();

      replaceWithElement(eventFormComponent, eventComponent);

      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setOnEditClick(() => {
    replaceWithElement(eventComponent, eventFormComponent);

    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventFormComponent.setOnSubmit(() => {
    replaceWithElement(eventFormComponent, eventComponent);

    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  renderElement(listNode, eventComponent, RenderPosition.BEFORE_END);
};

const initEvents = (eventsContainer, boardEvents) => {
  const hasEvents = Boolean(events.length);

  if (!hasEvents) {
    const noEventsComponent = new NoEventsView();

    renderElement(eventsContainer, noEventsComponent, RenderPosition.BEFORE_END);

    return;
  }

  const destinationInfoComponent = new DestinationInfoView(cities, tripDays);
  const sortComponent = new SortView(sorts);
  const tripDaysComponent = new TripDaysView();
  const formEventComponent = new FormEventView(null, cities);

  renderElement(tripInfoComponent, destinationInfoComponent, RenderPosition.AFTER_BEGIN);
  renderElement(eventsContainer, sortComponent, RenderPosition.BEFORE_END);
  renderElement(eventsContainer, formEventComponent, RenderPosition.BEFORE_END);
  renderElement(eventsContainer, tripDaysComponent, RenderPosition.BEFORE_END);

  sortedStartDays.forEach((day, idx) => {
    const tripDayNumber = idx + 1;

    const tripDayComponent = new TripDayView(new Date(day), tripDayNumber);

    renderElement(tripDaysComponent, tripDayComponent, RenderPosition.BEFORE_END);

    const eventListNode = tripDaysComponent.node.querySelectorAll(`.trip-events__list`);

    boardEvents
      .filter((event) => {
        const isMathDate = getFixedDate(event.start).getTime() === getFixedDate(day).getTime();

        return isMathDate;
      })
      .forEach((it) => renderEvent(eventListNode[idx], it));
  });
};

renderElement(tripMaiNode, tripInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripInfoComponent, tripPriceComponent, RenderPosition.BEFORE_END);
renderElement(menuTitleNode, siteMenuComponent, RenderPosition.AFTER_END);
renderElement(filterTitleNode, filterComponent, RenderPosition.AFTER_END);

initEvents(eventsContainerNode, events);
