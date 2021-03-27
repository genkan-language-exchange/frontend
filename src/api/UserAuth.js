export default class UserAuth {
  constructor() {
    this._token = localStorage.getItem('genkan-token');
    this._config = {
      headers: {
        authorization: `Bearer ${this.token}`
      }
    }
  }

  get token() {
    return this._token
  }

  get config() {
    return this._config
  }
}