import {
  renderElement,
  getUniqueTripDays,
  getSortedDates,
  getSortedEventsByPrice,
  getSortedEventsByDuration,
  removeElement,
  getFixedDate
} from '~/helpers';
import {
  RenderPosition,
  EventSortType,
  SortOrder,
  UpdateType,
  UserAction,
  EventFilterType
} from '~/common/enums';
import {FilterTypeToFilterCbMap} from '~/common/map';
import NewEventPresenter from '~/presenter/new-event/new-event';
import TripDayPresenter from '~/presenter/trip-day/trip-day';
import NoEventsView from '~/view/no-events/no-events';
import SortView from '~/view/sort/sort';
import TripDaysView from '~/view/trip-days/trip-days';
import LoaderView from '~/view/loader/loader';
import {getEventsByDay} from './helpers';

const sorts = Object.values(EventSortType);

class Trip {
  constructor({
    containerNode,
    destinationsModel,
    offersModel,
    eventsModel,
    filterModel,
  }) {
    this._boardContainerNode = containerNode;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._currentSortType = EventSortType.EVENT;
    this._tripDayPresenters = {};
    this._isLoading = true;

    this._sortComponent = null;

    this._tripDaysComponent = new TripDaysView();
    this._noEventsComponent = new NoEventsView();
    this._loaderComponent = new LoaderView();

    this._changeSortType = this._changeSortType.bind(this);
    this._changeEventMode = this._changeEventMode.bind(this);
    this._changeViewAction = this._changeViewAction.bind(this);
    this._changeModelEvent = this._changeModelEvent.bind(this);

    this._newEventPresenter = new NewEventPresenter({
      container: this._tripDaysComponent,
      offers: this.offers,
      destinations: this.destinations,
      changeTripAction: this._changeViewAction,
    });
  }

  get events() {
    const {events} = this._eventsModel;
    const filterType = this._filterModel.filter;
    const filteredEvents = FilterTypeToFilterCbMap[filterType](events);

    switch (this._currentSortType) {
      case EventSortType.TIME: {
        return getSortedEventsByDuration(SortOrder.ASC, filteredEvents);
      }
      case EventSortType.PRICE: {
        return getSortedEventsByPrice(SortOrder.DESK, filteredEvents);
      }
    }

    return filteredEvents;
  }

  get destinations() {
    return this._destinationsModel.destinations;
  }

  get offers() {
    return this._offersModel.offers;
  }

  _renderEvents(events) {
    switch (this._currentSortType) {
      case EventSortType.EVENT:
        this._renderTripDays(events);
        break;
      case EventSortType.TIME:
      case EventSortType.PRICE:
        this._renderTripDay(events, null, null);
        break;
    }
  }

  _renderTripDays(events) {
    const tripDays = getUniqueTripDays(events);
    const sortedStartDays = getSortedDates(SortOrder.ASC, tripDays.start);

    sortedStartDays.forEach((day, idx) => {
      const tripDayNumber = idx + 1;
      const eventsByDay = getEventsByDay(events, day);

      this._renderTripDay(eventsByDay, day, tripDayNumber);
    });
  }

  _renderTripDay(events, day, dayNumber) {
    const tripDayPresenter = new TripDayPresenter({
      day,
      dayNumber,
      containerNode: this._tripDaysComponent,
      destinations: this.destinations,
      offers: this.offers,
      changeEvent: this._changeViewAction,
      changeEventMode: this._changeEventMode,
    });

    tripDayPresenter.init(events);

    this._tripDayPresenters[day] = tripDayPresenter;
  }

  _renderSorts() {
    if (!this._sortComponent) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView({
      sorts,
      currentSortType: this._currentSortType,
    });

    renderElement(
        this._boardContainerNode,
        this._sortComponent,
        RenderPosition.BEFORE_END
    );

    this._sortComponent.setOnSortTypeChange(this._changeSortType);
  }

  _renderNoEvents() {
    renderElement(
        this._boardContainerNode,
        this._noEventsComponent,
        RenderPosition.BEFORE_END
    );
  }

  _renderLoader() {
    renderElement(
        this._boardContainerNode,
        this._loaderComponent,
        RenderPosition.BEFORE_END
    );
  }

  _renderTripDaysList() {
    renderElement(
        this._boardContainerNode,
        this._tripDaysComponent,
        RenderPosition.BEFORE_END
    );
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoader();

      return;
    }

    const hasEvents = Boolean(this.events.length);

    if (!hasEvents) {
      this._renderNoEvents();

      return;
    }

    this._renderSorts();
    this._renderTripDaysList();
    this._renderEvents(this.events);
  }

  _clearTrip({isResetSortType = false} = {}) {
    this._newEventPresenter.destroy();

    Object.values(this._tripDayPresenters).forEach((it) => it.destroy());
    this._tripDayPresenters = {};

    removeElement(this._noEventsComponent);
    removeElement(this._loaderComponent);
    removeElement(this._sortComponent);

    if (isResetSortType) {
      this._currentSortType = EventSortType.EVENT;
    }
  }

  _changeSortType(sortType) {
    if (this.currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _changeEventMode() {
    this._newEventPresenter.destroy();

    Object.values(this._tripDayPresenters).forEach((it) => it.resetViews());
  }

  _changeViewAction(actionType, updateType, event) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, event);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, event);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, event);
        break;
    }
  }

  _changeModelEvent(updateType, update) {
    switch (updateType) {
      case UpdateType.PATCH: {
        const day = getFixedDate(update.start);

        this._tripDayPresenters[day].updateEvent(update);
        break;
      }
      case UpdateType.MINOR: {
        this._clearTrip();
        this._renderTrip();
        break;
      }
      case UpdateType.MAJOR: {
        this._clearTrip({
          isResetSortType: true,
        });
        this._renderTrip();
        break;
      }
      case UpdateType.INIT: {
        this._isLoading = false;
        removeElement(this._loaderComponent);
        this._renderTrip();
        break;
      }
    }
  }

  createEvent(destroyCallback) {
    if (this._filterModel.filter !== EventFilterType.EVERYTHING) {
      this._filterModel.setFilter(UpdateType.MINOR, EventFilterType.EVERYTHING);
    }

    this._newEventPresenter.init(destroyCallback);
  }

  destroy() {
    this._clearTrip({
      isResetSortType: true,
    });

    removeElement(this._tripDaysComponent);

    this._eventsModel.removeObserver(this._changeModelEvent);
    this._offersModel.removeObserver(this._changeModelEvent);
    this._destinationsModel.removeObserver(this._changeModelEvent);
    this._filterModel.removeObserver(this._changeModelEvent);
  }

  init() {
    this._renderTrip();

    this._eventsModel.addObserver(this._changeModelEvent);
    this._offersModel.addObserver(this._changeModelEvent);
    this._destinationsModel.addObserver(this._changeModelEvent);
    this._filterModel.addObserver(this._changeModelEvent);
  }
}

export default Trip;
