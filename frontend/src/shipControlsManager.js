
const ALLOWED_KEYS = new Set([
  'ArrowRight',
  'ArrowLeft',
  'ArrowDown',
  'ArrowUp',
  'Enter'
]);
export default class ShipControlManager {

  constructor(socket) {
    this.socket = socket;

    this.onKeyDown = event => {
      if (ALLOWED_KEYS.has(event.key)) {
        this.socket.emit('keydown', event.key);
        event.preventDefault();
      }
    };

    this.onKeyUp = event => {
      if (ALLOWED_KEYS.has(event.key)) {
        this.socket.emit('keyup', event.key);
        event.preventDefault();
      }
    };
  }

  attach() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
  }

  detach() {
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
  }

}
