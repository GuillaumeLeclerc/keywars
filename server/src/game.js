export default class Game {
  constructor(players) {
    if (players.length != 2) {
      throw "This is a two players game";
    }

    this.players = players;
    this.broadcast('game start', 'yeah');
  }

  broadcast(name, content) {
    for (let player of players) {
      player.socket.emit(name, content);
    }
  }
}
