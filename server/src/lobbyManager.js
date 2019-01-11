import Lobby from './lobby';

export default class LobbyManager {

  lobbies = new Map();
  clients = new Set();

  constructor() {
    this.mainLobby = new Lobby();
  }

  addClient(client) {
    client.socket.on('lobby-connect', lobbyName => {
      this.connect(client, lobbyName);
    });
    this.clients.add(client);
  }

  connect(client, lobbyName) {
    this.mainLobby.join(client);
  }
}
