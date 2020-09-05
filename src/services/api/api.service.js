import {SuccessHTTPStatusRange, ApiMethod} from '~/common/enums';

class Api {
  constructor(endPoint, authorization) {
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
    return this._load({url: `points`}).then(Api.toJSON);
  }

  get destinations() {
    this._load({url: `destinations`}).then(Api.toJSON);
  }

  get offers() {
    this._load({url: `offers`}).then(Api.toJSON);
  }

  _load({url, method = ApiMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }
}

export default Api;
