import {
  updateItem,
  renderElement,
  getUniqueTripDays,
  getSortedDates,
  getSortedEventsByPrice,
  getSortedEventsByDuration,
  removeElement
} from '~/helpers';
import {
  RenderPosition,
  EventSortType,
  SortOrder,
  UpdateType,
  UserAction
} from '~/common/enums';
import TripDayPresenter from '~/presenter/trip-day/trip-day';
import NoEventsView from '~/view/no-events/no-events';
import SortView from '~/view/sort/sort';
import TripDaysView from '~/view/trip-days/trip-days';
import {getEventsByDay} from './helpers';

const sorts = Object.values(EventSortType);

class Trip {
  constructor({containerNode, destinationsModel, offersModel, eventsModel}) {
    this._boardContainerNode = containerNode;
    this._destinationsModel = destinationsModel;
    this._offersModel = offersModel;
    this._eventsModel = eventsModel;
    this._currentSortType = EventSortType.EVENT;
    this._tripDayPresenters = {};

    this._noEventsComponent = new NoEventsView();
    this._sortComponent = new SortView(sorts);
    this._tripDaysComponent = new TripDaysView();

    this._changeSortType = this._changeSortType.bind(this);
    this._onEventChange = this._onEventChange.bind(this);
    this._onEventModeChange = this._onEventModeChange.bind(this);
  }

  get events() {
    const events = this._eventsModel.events;
    switch (this._currentSortType) {
      case EventSortType.TIME: {
        return getSortedEventsByDuration(SortOrder.ASC, events);
      }
      case EventSortType.PRICE: {
        return getSortedEventsByPrice(SortOrder.DESK, events);
      }
    }

    return events;
  }

  get destinations() {
    return this._destinationsModel.destinations;
  }

  get offers() {
    return this._offersModel.offers;
  }

  _onEventChange(dayNumber, event) {
    this._tripEvents = updateItem(this._tripEvents, event, `id`);

    this._tripDayPresenters[dayNumber].updateEvent(event);
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
      onEventChange: this._onEventChange,
      onEventModeChange: this._onEventModeChange,
    });

    tripDayPresenter.init(events);

    this._tripDayPresenters[dayNumber] = tripDayPresenter;
  }

  _renderNoEvents() {
    renderElement(
        this._boardContainerNode,
        this._noEventsComponent,
        RenderPosition.BEFORE_END
    );
  }

  _renderSorts() {
    renderElement(
        this._boardContainerNode,
        this._sortComponent,
        RenderPosition.BEFORE_END
    );

    this._sortComponent.setOnSortTypeChange(this._changeSortType);
  }

  _renderTripDaysList() {
    renderElement(
        this._boardContainerNode,
        this._tripDaysComponent,
        RenderPosition.BEFORE_END
    );
  }

  _renderTrip() {
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
    Object.values(this._tripDayPresenters).forEach((it) => it.destroy());

    this._tripDayPresenters = {};

    removeElement(this._noEventsComponent);

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

  _onEventModeChange() {
    Object.values(this._tripDayPresenters).forEach((it) => it.resetViews());
  }

  changeViewAction(actionType, updateType, task) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.eventsModel.updateTask(updateType, task);
        break;
      case UserAction.ADD_EVENT:
        this.eventsModel.addTasks(updateType, task);
        break;
      case UserAction.DELETE_EVENT:
        this.eventsModel.deleteTasks(updateType, task);
        break;
    }
  }

  _changeModelEvent(updateType, updateOptions) {
    switch (updateType) {
      case UpdateType.PATCH: {
        const {dayNumber, event} = updateOptions;
        this._tripDayPresenters[dayNumber].updateEvent(event);
        break;
      }
      case UpdateType.MINOR: {
        this._clearTrip();
        this._renderTrip();
        break;
      }
      case UpdateType.MAJOR: {
        this._clearTrip({
          isResetRenderedTaskCount: true,
          isResetSortType: true,
        });
        this._renderTrip();
        break;
      }
    }
  }

  destroy() {
    this._clearTrip({
      isResetSortType: true,
    });

    removeElement(this._sortComponent);
    removeElement(this._tripDaysComponent);

    this._eventsModel.removeObserver(this._changeModelEvent);
    this._offersModel.removeObserver(this._changeModelEvent);
    this._destinationsModel.removeObserver(this._changeModelEvent);
  }

  init() {
    this._renderTrip();

    this._eventsModel.addObserver(this._changeModelEvent);
    this._offersModel.addObserver(this._changeModelEvent);
    this._destinationsModel.addObserver(this._changeModelEvent);
  }
}

export default Trip;
