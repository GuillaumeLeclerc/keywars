import { action, reaction, observable } from 'mobx';

export default class TypingManager {

  @observable content = "";

  acceptedWords = new Set();

  constructor(onMatch) {
    this.onMatch = onMatch;

    this.onKeyPress = action((event) => {
      const { key } = event;
      if (key.length == 1 && key != " ") {
        this.content = this.content + key;
        for (let id in this.acceptedWords) {
          const word = this.acceptedWords[id];
          if (word === this.content) {
            this.discardWord(id);
            if (typeof this.onMatch === 'function') {
              this.onMatch(this.content);
              this.content = "";
            }
          }
        }
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

  registerWord(id, word) {
    this.acceptedWords[id] = word;
  }

  discardWord(id) {
    delete this.acceptedWords[id]
  }
}
