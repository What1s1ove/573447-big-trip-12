import 'flatpickr/dist/flatpickr.min.css';
import {Api} from './services';
import {renderElement, removeElement} from '~/helpers';
import {RenderPosition, AppNavigation, UpdateType} from '~/common/enums';
import DestinationInfoPresenter from '~/presenter/destination-info/destination-info';
import FilterPresenter from '~/presenter/filter/filter';
import TripPresenter from '~/presenter/trip/trip';
import EventsModel from '~/models/events/events';
import DestinationsModel from '~/models/destinations/destinations';
import OffersModel from '~/models/offer/offers';
import FilterModel from '~/models/filter/filter';
import SiteMenuView from '~/view/site-menu/site-menu';
import StatisticsView from '~/view/statistics/statistics';

const AUTHORIZATION = `Basic 14881337322`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const api = new Api({
  endPoint: END_POINT,
  authorization: AUTHORIZATION,
});

const siteMenuItems = Object.values(AppNavigation);

const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const siteMenuComponent = new SiteMenuView(siteMenuItems);

const newEventBtnNode = document.querySelector(`.trip-main__event-add-btn`);
const tripMainNode = document.querySelector(`.trip-main`);
const menuTitleNode = tripMainNode.querySelector(`.trip-main__menu-title`);
const filterTitleNode = tripMainNode.querySelector(`.trip-main__filter-title`);
const eventsContainerNode = document.querySelector(`.trip-events`);

const closeNewEventForm = () => {
  newEventBtnNode.disabled = false;
};

const destinationInfoPresenter = new DestinationInfoPresenter({
  containerNode: tripMainNode,
  destinationsModel,
  eventsModel,
});

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
  api
});

let statisticsComponent = null;

const changeMenuItem = (menuItem) => {

  switch (menuItem) {
    case AppNavigation.TABLE:
      tripPresenter.destroy();
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

renderElement(menuTitleNode, siteMenuComponent, RenderPosition.AFTER_END);

destinationInfoPresenter.init();
filterPresenter.init();
tripPresenter.init();

newEventBtnNode.addEventListener(`click`, () => {
  changeMenuItem(AppNavigation.TABLE);

  tripPresenter.createEvent(closeNewEventForm);

  newEventBtnNode.disabled = true;
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

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});
