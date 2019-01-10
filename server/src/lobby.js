import game from './game';

class Lobby {
  members = Set();

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
    if (this.members.size < 2) {
      return;
    }

    let i = 0;
    const match = [];
    for (let client of this.members) {
      match.push(client);
      if (i++ > 1) {
        break;
      }
    }
  }
}
