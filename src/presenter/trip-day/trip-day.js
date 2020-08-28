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
    day,
    dayNumber,
    onEventChange,
    onEventModeChange,
  }) {
    this._containerNode = containerNode;
    this._day = day;
    this._dayNumber = dayNumber;
    this._destinations = destinations;
    this._onEventChange = onEventChange;
    this._onEventModeChange = onEventModeChange;

    this._tripDayComponent = null;
    this._tripDayEventsListComponent = null;
    this._eventPresenters = {};

    this._onEventLocalChange = this._onEventLocalChange.bind(this);
  }

  _renderEvent(event) {
    const tripDayEventsItemComponent = new TripDayEventsItemView();
    const eventPresenter = new EventPresenter({
      containerNode: tripDayEventsItemComponent.node,
      destinations: this._destinations,
      onEventChange: this._onEventLocalChange,
      onEventModeChange: this._onEventModeChange,
    });

    renderElement(
        this._tripDayEventsListComponent,
        tripDayEventsItemComponent,
        RenderPosition.BEFORE_END
    );

    eventPresenter.init(event);

    this._eventPresenters[event.id] = eventPresenter;
  }

  _onEventLocalChange(event) {
    this._onEventChange(this._dayNumber, event);
  }

  _renderEvents(events) {
    events.forEach((it) => this._renderEvent(it));
  }

  _clearEvents() {
    Object.values(this._eventPresenters).forEach((it) => it.destroy());

    this._eventPresenters = {};
  }

  updateEvent(event) {
    this._eventPresenters[event.id].init(event);
  }

  resetViews() {
    Object.values(this._eventPresenters).forEach((it) => it.resetView());
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
}

export default TripDay;
