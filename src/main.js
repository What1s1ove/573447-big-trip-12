import 'flatpickr/dist/flatpickr.min.css';
import {Api} from './services';
import {
  renderElement,
  removeElement,
  getTotalPrice,
  getUniqueTripDays,
} from '~/helpers';
import {RenderPosition, AppNavigation, UpdateType} from '~/common/enums';
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
import StatisticsView from '~/view/statistics/statistics';

const AUTHORIZATION = `Basic 14881337322`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip/`;

const api = new Api({
  endPoint: END_POINT,
  authorization: AUTHORIZATION,
});

const siteMenuItems = Object.values(AppNavigation);

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripDays = getUniqueTripDays(eventsModel.events);
const totalPrice = getTotalPrice(eventsModel.events);

const tripInfoComponent = new TripInfoView();
// const destinationInfoComponent = new DestinationInfoView(destinationsModel.destinations, tripDays);
const tripPriceComponent = new TripPriceView(totalPrice);
const siteMenuComponent = new SiteMenuView(siteMenuItems);

const newEventBtnNode = document.querySelector(`.trip-main__event-add-btn`);
const tripMaiNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMaiNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMaiNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

const closeNewEventForm = () => {
  newEventBtnNode.disabled = false;
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

let statisticsComponent = null;

const changeMenuItem = (menuItem) => {

  switch (menuItem) {
    case AppNavigation.TABLE:
      tripPresenter.init();
      removeElement(statisticsComponent);
      break;
    case AppNavigation.STATS:
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView({
        events: eventsModel.events
      });
      renderElement(eventsContainerNode, statisticsComponent, RenderPosition.BEFORE_END);
      break;
  }

  siteMenuComponent.setMenuItem(menuItem);
};

siteMenuComponent.setOnItemClick(changeMenuItem);

// renderElement(tripInfoComponent, destinationInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripMaiNode, tripInfoComponent, RenderPosition.AFTER_BEGIN);
renderElement(tripInfoComponent, tripPriceComponent, RenderPosition.BEFORE_END);
renderElement(menuTitleNode, siteMenuComponent, RenderPosition.AFTER_END);

filterPresenter.init();
tripPresenter.init();

newEventBtnNode.addEventListener(`click`, () => {
  tripPresenter.createEvent(closeNewEventForm);

  newEventBtnNode.disabled = true;

  changeMenuItem(AppNavigation.TABLE);
});


Promise.all([api.events, api.destinations, api.offers])
  .then(([events, destinations, offers]) => {
    destinationsModel.destinations = destinations;
    offersModel.offers = offers;
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    destinationsModel.destinations = [];
    offersModel.offers = [];
    eventsModel.setEvents(UpdateType.INIT, []);
  })
  .finally(() => {
    newEventBtnNode.disabled = false;
  });
