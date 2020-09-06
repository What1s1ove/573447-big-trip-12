import {SuccessHTTPStatusRange, ApiMethod} from '~/common/enums';
import EventsModel from '~/models/event/events';
import DestinationsModel from '~/models/destination/destination';

class Api {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }

  get events() {
    return this._load({url: `points`})
      .then(Api.toJSON)
      .then((events) => events.map(EventsModel.adaptToClient));
  }

  get destinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON)
      .then((destinations) => destinations.map(DestinationsModel.adaptToClient));
  }

  get offers() {
    return this._load({url: `offers`}).then(Api.toJSON);
  }

  _load({url, method = ApiMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  updateEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: ApiMethod.PUT,
      body: JSON.stringify(EventsModel.adaptToServer(event)),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(Api.toJSON)
      .then(EventsModel.adaptToClient);
  }

  addEvent(event) {
    return this._load({
      url: `points`,
      method: ApiMethod.POST,
      body: JSON.stringify(EventsModel.adaptToServer(event)),
      headers: new Headers({'Content-Type': `application/json`}),
    })
      .then(Api.toJSON)
      .then(EventsModel.adaptToClient);
  }

  deleteEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: ApiMethod.DELETE,
    });
  }

  syncEvents(data) {
    return this._load({
      url: `/points/sync`,
      method: ApiMethod.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON);
  }
}

export default Api;
