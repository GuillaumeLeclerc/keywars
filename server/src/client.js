export class ClientInfo {

  constructor(username) {
    this.username = username;
  }

}

export default class Client {

  info = false;

  constructor(socket) {
    this.socket = socket;

    this.socket.on('authenticate', content => {
      const info = new ClientInfo(content);
      this.authenticate(info);
    });
  }

  authenticate(clientInfo) {
    this.info = clientInfo;
    this.socket.emit('authenticated');
  }
}
