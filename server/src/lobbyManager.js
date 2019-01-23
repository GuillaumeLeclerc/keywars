import Lobby from './lobby';

export default class LobbyManager {

  lobbies = new Map();
  clients = new Set();

  constructor() {
    this.mainLobby = new Lobby('medium-english.json');
  }

  reportLobbies(socket) {
    socket.emit('lobby-list', [
      {
        name: 'General Lobby',
        id: 0,
      }
    ])
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
