import { action, reaction, observable } from 'mobx';

export default class TypingManager {

  @observable content = "";

  constructor() {
    this.onKeyPress = action((event) => {
      const { key } = event;
      if (key.length == 1) {
        this.content = this.content + key;
        event.preventDefault();
      }
    });

    this.onKeyDown = action((event) => {
      const { key } = event;
      if (key == "Backspace") {
        this.content = this.content.slice(0, this.content.length - 1);
        event.preventDefault();
      }
      else if (key == " ") {
        this.content = "";
      }
    });
  }

  attach() {
    document.addEventListener("keypress", this.onKeyPress);
    document.addEventListener("keydown", this.onKeyDown);
  }

  detach() {
    document.removeEventListener("keypress", this.onKeyPress);
    document.removeEventListener("keydown", this.onKeyDown);
  }
}
