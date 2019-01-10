import { observable } from 'mobx';

export default class Ship {

  @observable x = 100;
  @observable y = 100;

  constructor(isMe) {
    this.isMe = isMe;
  }
};
