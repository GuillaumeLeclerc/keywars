import { action, observable } from 'mobx';

export default class Ship {

  @observable x = 100;
  @observable y = 100;

  constructor(isMe) {
    this.isMe = isMe;
  }

  @action
  update(data) {
    this.x = data.position.x;
    this.y = data.position.y;
  }
};
