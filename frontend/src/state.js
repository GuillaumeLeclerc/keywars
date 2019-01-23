import { observable, action } from 'mobx';

import Game from './game.js';

class MainState {
  @observable loggedIn = false;
  @observable lobby = null;
  @observable lobbies = null;
  @observable inGame = false;
  @observable game = null;

  gameContainer = null;

  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.once('lobby-list', list => {
      this.lobbies = list;
    });
    this.socket.on('game-start', this.startGame.bind(this))
  }

  @action
  startGame() {
    this.inGame = true;
  }

  provideGameContainer(container) {
    console.log(this.socket, container);
    this.game = new Game(this.socket, container);
  }

  @action
  login(username, password) {
    this.socket.emit('authenticate', {
      username, password
    });
    this.socket.once('authenticated', this.authenticated.bind(this));
  }

  @action
  joinLobby(id) {
    this.socket.emit('lobby-connect', id);
    this.lobby = id;
  }

  @action
  authenticated() {
    this.loggedIn = true;
  }
}

export default new MainState();
