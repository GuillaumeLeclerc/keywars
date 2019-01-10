export class ClientInfo {

  constructor(username) {
    this.username = username;
  }

}

export default class Client {

  info = false;

  constructor(socket) {
    this.socket = socket;
  }

  authenticate(clientInfo) {
    this.info = clientInfo;
  }
}
