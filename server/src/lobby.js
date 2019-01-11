import Game from './game';

export default class Lobby {
  members = new Set();

  constructor() {
  }

  join(client) {
    if (!client.info) {
      throw "Not authenticated";
    }

    this.members.add(client);
    client.lobby = this;
    this.match();
  }

  quit(client) {
    if (this.members.has(client)) {
      this.members.delete(client)
      client.lobby = null;
    }
  }

  match() {
    if (this.members.size < 1) {
      return;
    }

    let i = 0;
    const match = [];
    for (let client of this.members) {
      match.push(client);
      this.quit(client);
      if (i++ > 0) {
        break;
      }
    }

    new Game(match);
  }
}
