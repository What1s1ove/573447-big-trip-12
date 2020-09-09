import {removeElement, renderElement} from '~/helpers';
import {RenderPosition} from '~/common/enums';
import EventPresenter from '~/presenter/event/event';
import TripDayView from '~/view/trip-day/trip-day';
import TripDayEventsListView from '~/view/trip-day-events-list/trip-day-events-list';
import TripDayEventsItemView from '~/view/trip-day-events-item/trip-day-event-item';

class TripDay {
  constructor({
    containerNode,
    destinations,
    offers,
    day,
    dayNumber,
    changeEvent,
    changeEventMode,
  }) {
    this._containerNode = containerNode;
    this._day = day;
    this._dayNumber = dayNumber;
    this._destinations = destinations;
    this._offers = offers;
    this._changeEvent = changeEvent;
    this._changeEventMode = changeEventMode;

    this._tripDayComponent = null;
    this._tripDayEventsListComponent = null;
    this._eventPresenters = {};
  }

  init(events) {
    this._events = events;

    this._tripDayComponent = new TripDayView(this._day, this._dayNumber);
    this._tripDayEventsListComponent = new TripDayEventsListView();

    renderElement(
        this._containerNode,
        this._tripDayComponent,
        RenderPosition.BEFORE_END
    );

    renderElement(
        this._tripDayComponent,
        this._tripDayEventsListComponent,
        RenderPosition.BEFORE_END
    );

    this._renderEvents(this._events);
  }

  destroy() {
    this._clearEvents();

    removeElement(this._tripDayComponent);
    removeElement(this._tripDayEventsListComponent);
  }

  updateEvent(event) {
    this._eventPresenters[event.id].init(event);
  }

  resetViews() {
    Object.values(this._eventPresenters).forEach((eventPresenter) => eventPresenter.resetView());
  }

  setEventView(event, eventState) {
    this._eventPresenters[event.id].setViewState(eventState);
  }

  _renderEvent(event) {
    const tripDayEventsItemComponent = new TripDayEventsItemView();
    const eventPresenter = new EventPresenter({
      containerNode: tripDayEventsItemComponent.node,
      destinations: this._destinations,
      offers: this._offers,
      changeEvent: this._changeEvent,
      changeEventMode: this._changeEventMode,
    });

    renderElement(
        this._tripDayEventsListComponent,
        tripDayEventsItemComponent,
        RenderPosition.BEFORE_END
    );

    eventPresenter.init(event);

    this._eventPresenters[event.id] = eventPresenter;
  }

  _renderEvents(events) {
    events.forEach((event) => this._renderEvent(event));
  }

  _clearEvents() {
    Object.values(this._eventPresenters).forEach((eventPresenter) => eventPresenter.destroy());

    this._eventPresenters = {};
  }
}

export default TripDay;
