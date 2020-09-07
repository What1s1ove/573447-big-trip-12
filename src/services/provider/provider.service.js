import {nanoid} from 'nanoid';
import EventsModel from '~/models/event/events';
import DestinationsModel from '~/models/destination/destination';
import {createEventStoreStructure, getSyncedEvents} from './helpers';

class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  get events() {
    if (Provider.isOnline) {
      return this._api.events.then((events) => {
        const items = createEventStoreStructure(events.map(EventsModel.adaptToServer));

        this._store.events = items;

        return events;
      });
    }

    const storeEvents = Object.values(this._store.events);

    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  get destinations() {
    if (Provider.isOnline) {
      return this._api.destinations.then((destinations) => {
        this._store.destinations = destinations.map(DestinationsModel.adaptToServer);

        return destinations;
      });
    }

    return Promise.resolve(
        this._store.destinations.map(DestinationsModel.adaptToClient)
    );
  }

  get offers() {
    if (Provider.isOnline) {
      return this._api.offers.then((offers) => {

        this._store.offers = offers;

        return offers;
      });
    }

    return Promise.resolve(this._store.offers);
  }

  updateEvent(event) {
    if (Provider.isOnline) {
      return this._api.updateEvent(event).then((updatedEvent) => {
        this._store.setEvent(
            updatedEvent.id,
            EventsModel.adaptToServer(updatedEvent)
        );

        return updatedEvent;
      });
    }

    this._store.setEvent(
        event.id,
        EventsModel.adaptToServer(Object.assign({}, event))
    );

    return Promise.resolve(event);
  }

  addEvent(event) {
    if (Provider.isOnline) {
      return this._api.addEvent(event).then((newEvent) => {
        this._store.setEvent(
            newEvent.id,
            EventsModel.adaptToServer(newEvent)
        );

        return newEvent;
      });
    }

    const localNewEvent = Object.assign({}, event, {id: nanoid()});

    this._store.setEvent(
        localNewEvent.id,
        EventsModel.adaptToServer(localNewEvent)
    );

    return Promise.resolve(localNewEvent);
  }

  deleteEvent(event) {
    if (Provider.isOnline) {
      return this._api
        .deleteEvent(event)
        .then(() => this._store.removeEvent(event.id));
    }

    this._store.removeEvent(event.id);

    return Promise.resolve();
  }

  syncEvents() {
    if (Provider.isOnline) {
      const storeEvents = Object.values(this._store.events);

      return this._api.syncEvents(storeEvents).then((response) => {
        const createdEvents = getSyncedEvents(response.created);
        const updatedEvents = getSyncedEvents(response.updated);

        const items = createEventStoreStructure([...createdEvents, ...updatedEvents]);

        this._store.events = items;
      });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static get isOnline() {
    return window.navigator.onLine;
  }
}

export default Provider;
