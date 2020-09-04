import 'flatpickr/dist/flatpickr.min.css';
import {
  renderElement,
  generateDestinations,
  generateDestinationOffers,
  generateEvents,
  getTotalPrice,
  getUniqueTripDays,
} from '~/helpers';
import {RenderPosition, AppNavigation, EventType} from '~/common/enums';
import {EVENT_CITIES} from '~/common/constants';
import TripPresenter from '~/presenter/trip/trip';
import FilterPresenter from '~/presenter/filter/filter';
import EventsModel from '~/models/events/events';
import DestinationsModel from '~/models/destinations/destinations';
import OffersModel from '~/models/offer/offers';
import FilterModel from '~/models/filter/filter';
import DestinationInfoView from '~/view/destination-info/destination-info';
import TripPriceView from '~/view/trip-price/trip-price';
import SiteMenuView from '~/view/site-menu/site-menu';
import TripInfoView from '~/view/trip-info/trip-info';

const EVENTS_COUNT = 20;
const eventTypes = Object.values(EventType);

const destinations = generateDestinations(EVENT_CITIES);
const offers = generateDestinationOffers(eventTypes);
const events = generateEvents(EVENTS_COUNT, destinations, offers);
const tripDays = getUniqueTripDays(events);
const siteMenuItems = Object.values(AppNavigation);
const totalPrice = getTotalPrice(events);

const destinationsModel = new DestinationsModel();
destinationsModel.destinations = destinations;
const offersModel = new OffersModel();
offersModel.offers = offers;
const eventsModel = new EventsModel();
eventsModel.events = events;
const filterModel = new FilterModel();

const tripInfoComponent = new TripInfoView();
const destinationInfoComponent = new DestinationInfoView(destinations, tripDays).node;
const tripPriceComponent = new TripPriceView(totalPrice);
const siteMenuComponent = new SiteMenuView(siteMenuItems);

const newEventNode = document.querySelector(`.trip-main__event-add-btn`);
const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

const closeNewEventForm = () => {
  newEventNode.disabled = false;
};

const filterPresenter = new FilterPresenter({
  containerNode: filterTitleNode,
  filterModel
});

const tripPresenter = new TripPresenter({
  containerNode: eventsContainerNode,
  destinationsModel,
  offersModel,
  eventsModel,
  filterModel,
});

renderElement(tripInfoComponent, destinationInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripMaiNode, tripInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripInfoComponent, tripPriceComponent, RenderPosition.BEFORE_END);
renderElement(menuTitleNode, siteMenuComponent, RenderPosition.AFTER_END);

filterPresenter.init();
tripPresenter.init();

newEventNode.addEventListener(`click`, () => {
  tripPresenter.createEvent(closeNewEventForm);

  newEventNode.disabled = true;
});
