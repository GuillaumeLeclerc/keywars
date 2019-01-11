import Game from './game';

export default class SocketManager {

  game = null;

  authenticate() {
    this.socket.emit('authenticate', 'how are you');
    this.socket.once('authenticated', () => {
      this.socket.emit('lobby-connect', 'main');
      this.authenticated = true;
      this.socket.on('game-start', () => {
        this.game = new Game(this.socket, this.gameContainer);
      });
    });
  }

  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    const socket = io('http://localhost:3000');
    this.socket = socket;
  }
}
