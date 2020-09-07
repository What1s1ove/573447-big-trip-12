import 'flatpickr/dist/flatpickr.min.css';
import {Api, Provider, Store} from './services';
import {renderElement, removeElement} from '~/helpers';
import {RenderPosition, AppNavigation, UpdateType} from '~/common/enums';
import DestinationInfoPresenter from '~/presenter/destination-info/destination-info';
import FilterPresenter from '~/presenter/filter/filter';
import TripPresenter from '~/presenter/trip/trip';
import EventsModel from '~/models/event/events';
import DestinationsModel from '~/models/destination/destination';
import OffersModel from '~/models/offer/offer';
import FilterModel from '~/models/filter/filter';
import SiteMenuView from '~/view/site-menu/site-menu';
import StatisticsView from '~/view/statistics/statistics';

const AUTHORIZATION = `Basic 14881337322`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const newEventBtnNode = document.querySelector(`.trip-main__event-add-btn`);
const tripMainNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMainNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMainNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

const siteMenuItems = Object.values(AppNavigation);

const api = new Api({
  endPoint: END_POINT,
  authorization: AUTHORIZATION,
});

const store = new Store({
  key: STORE_NAME,
  storage: window.localStorage,
});

const apiWithProvider = new Provider({
  api,
  store,
});

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView(siteMenuItems);

const closeNewEventForm = () => {
  newEventBtnNode.disabled = false;
};

const destinationInfoPresenter = new DestinationInfoPresenter({
  containerNode: tripMainNode,
  eventsModel,
});

const filterPresenter = new FilterPresenter({
  containerNode: filterTitleNode,
  eventsModel,
  filterModel,
});

const tripPresenter = new TripPresenter({
  containerNode: eventsContainerNode,
  destinationsModel,
  offersModel,
  eventsModel,
  filterModel,
  api: apiWithProvider,
});

let statisticsComponent = null;

const changeMenuItem = (menuItem) => {

  switch (menuItem) {
    case AppNavigation.TABLE: {
      tripPresenter.destroy();
      tripPresenter.init();
      removeElement(statisticsComponent);
      break;
    }
    case AppNavigation.STATS: {
      tripPresenter.destroy();
      statisticsComponent = new StatisticsView({
        events: eventsModel.events
      });
      renderElement(eventsContainerNode, statisticsComponent, RenderPosition.BEFORE_END);
      break;
    }
  }

  siteMenuComponent.setMenuItem(menuItem);
};

siteMenuComponent.setOnItemClick(changeMenuItem);

renderElement(menuTitleNode, siteMenuComponent, RenderPosition.AFTER_END);

destinationInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

newEventBtnNode.addEventListener(`click`, () => {
  changeMenuItem(AppNavigation.TABLE);

  tripPresenter.createEvent(closeNewEventForm);

  newEventBtnNode.disabled = true;
});


Promise.all([
  apiWithProvider.events,
  apiWithProvider.destinations,
  apiWithProvider.offers,
])
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.syncEvents();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
