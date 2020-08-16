import {
  renderElement,
  generateEvents,
  getTotalPrice,
  getUniqueTripDays,
  getUniqueCities,
} from '~/helpers';
import {RenderPosition, AppNavigation, EventFilerType} from '~/common/enums';
import Trip from '~/presenter/trip/trip';
import DestinationInfoView from '~/view/destination-info/destination-info';
import TripPriceView from '~/view/trip-price/trip-price';
import SiteMenuView from '~/view/site-menu/site-menu';
import FilterView from '~/view/filter/filter';
import TripInfoView from '~/view/trip-info/trip-info';

const EVENTS_COUNT = 20;

const events = generateEvents(EVENTS_COUNT);
const tripDays = getUniqueTripDays(events);
const cities = getUniqueCities(events);
const siteMenuItems = Object.values(AppNavigation);
const filters = Object.values(EventFilerType);
const totalPrice = getTotalPrice(events);

const tripInfoComponent = new TripInfoView();
const destinationInfoComponent = new DestinationInfoView(cities, tripDays).node;
const tripPriceComponent = new TripPriceView(totalPrice);
const siteMenuComponent = new SiteMenuView(siteMenuItems);
const filterComponent = new FilterView(filters);

const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

renderElement(tripInfoComponent, destinationInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripMaiNode, tripInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripInfoComponent, tripPriceComponent, RenderPosition.BEFORE_END);
renderElement(menuTitleNode, siteMenuComponent, RenderPosition.AFTER_END);
renderElement(filterTitleNode, filterComponent, RenderPosition.AFTER_END);

new Trip(eventsContainerNode).init(events);
