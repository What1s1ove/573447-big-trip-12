import {Observer} from '~/helpers';
import DestinationsModel from '../destination/destination';

class Events extends Observer {
  constructor() {
    super();

    this._events = [];
  }

  get events() {
    return this._events;
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  updateEvent(updateType, eventToUpdate) {
    this._events = this._events.map((event) =>
      event.id === eventToUpdate.id ? eventToUpdate : event
    );

    this._notify(updateType, eventToUpdate);
  }

  addEvent(updateType, event) {
    this._events = [event, ...this._events];

    this._notify(updateType, event);
  }

  deleteEvent(updateType, eventToDelete) {
    this._events = this._events.filter((event) => event.id !== eventToDelete.id);

    this._notify(updateType, eventToDelete);
  }

  static adaptToClient(event) {
    const adaptedEvent = {
      id: event.id,
      destination: DestinationsModel.adaptToClient(event.destination),
      price: event.base_price,
      start: new Date(event.date_from),
      end: new Date(event.date_to),
      isFavorite: event.is_favorite,
      offers: event.offers,
      type: event.type,
    };

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = {
      // ! because of camelcase eslint rule
      'id': event.id,
      'destination': DestinationsModel.adaptToServer(event.destination),
      'base_price': event.price,
      'date_from': event.start.toISOString(),
      'date_to': event.end.toISOString(),
      'is_favorite': event.isFavorite,
      'offers': event.offers,
      'type': event.type,
    };

    return adaptedEvent;
  }
}

export default Events;
