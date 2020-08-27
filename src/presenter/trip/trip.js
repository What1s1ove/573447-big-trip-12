import {
  renderElement,
  getUniqueTripDays,
  getSortedDates,
  getSortedEventsByPrice,
  getSortedEventsByDuration
} from '~/helpers';
import {RenderPosition, EventSortType, SortOrder} from '~/common/enums';
import TripDayPresenter from '~/presenter/trip-day/trip-day';
import NoEventsView from '~/view/no-events/no-events';
import SortView from '~/view/sort/sort';
import TripDaysView from '~/view/trip-days/trip-days';
import {getEventsByDay} from './helpers';

const sorts = Object.values(EventSortType);

class Trip {
  constructor(boardContainerNode) {
    this._boardContainerNode = boardContainerNode;
    this._currentSortType = EventSortType.EVENT;
    this._tripDayPresenters = {};

    this._noEventsComponent = new NoEventsView();
    this._sortComponent = new SortView(sorts);
    this._tripDaysComponent = new TripDaysView();

    this._changeSortType = this._changeSortType.bind(this);
    this._updateEvent = this._updateEvent.bind(this);
    this._changeEventMode = this._changeEventMode.bind(this);
  }

  _updateEvent(eventDayNumber, event) {

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

  _renderTripDay(events, day, tripDayNumber) {
    const tripDayPresenter = new TripDayPresenter(
        this._tripDaysComponent,
        this._tripDestinations,
        day,
        tripDayNumber
    );

    tripDayPresenter.init(events);

    this._tripDayPresenters[tripDayNumber] = tripDayPresenter;
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case EventSortType.TIME: {
        const sortedEvents = getSortedEventsByDuration(SortOrder.ASC, this._tripEvents);

        this._renderTripDay(sortedEvents, null, null);
        break;
      }
      case EventSortType.PRICE: {
        const sortedEvents = getSortedEventsByPrice(SortOrder.DESK, this._tripEvents);

        this._renderTripDay(sortedEvents);
        break;
      }
      default:
        this._renderTripDays(this._tripEvents);
    }

    this._currentSortType = sortType;
  }

  _renderNoEvents() {
    renderElement(this._boardContainerNode, this._noEventsComponent, RenderPosition.BEFORE_END);
  }

  _renderSorts() {
    renderElement(this._boardContainerNode, this._sortComponent, RenderPosition.BEFORE_END);

    this._sortComponent.setOnSortTypeChange(this._changeSortType);
  }

  _renderTripDaysList() {
    renderElement(this._boardContainerNode, this._tripDaysComponent, RenderPosition.BEFORE_END);
  }

  _clearTripDaysList() {
    Object
    .values(this._tripDayPresenters)
    .forEach((it) => it.destroy());

    this._tripDayPresenters = {};
  }

  _renderTrip() {
    const hasEvents = Boolean(this._tripEvents.length);

    if (!hasEvents) {
      this._renderNoEvents();

      return;
    }

    this._renderSorts();
    this._renderTripDaysList();
    this._renderTripDays(this._tripEvents);
  }

  _changeSortType(sortType) {
    if (this.currentSortType === sortType) {
      return;
    }

    this._clearTripDaysList();
    this._sortEvents(sortType);
  }

  _changeEventMode() {
    Object.values(this._eventPresenters).forEach((it) => it.resetView());
  }

  init(events, destinations) {
    this._tripEvents = events.slice();
    this._tripDestinations = destinations.slice();

    this._renderTrip();
  }
}

export default Trip;
