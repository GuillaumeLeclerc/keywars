import { action, observable } from 'mobx';

export default class Entity2D {

  @observable x = 0;
  @observable y = 0;

  @action
  update(data) {
    this.x = data.position.x;
    this.y = data.position.y;
  }

  destroy() {
    // does nothing
  }
};
