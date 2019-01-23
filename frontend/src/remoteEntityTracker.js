import { observable } from 'mobx';

export default class RemoteObjectTracker {

  @observable
  entities = new Map();
  renderers = new Map();
  keys = new Set();

  constructor(name, clz, renderer, stage, socket, requireData=false) {
    this.name = name;
    this.clz = clz;
    this.renderer = renderer;
    this.stage = stage;
    this.creationData = {};
    this.requireData = requireData;
    socket.on('new-' + name, content => {
      this.creationData[content.id] = content;
    });
  }

  update(data) {
    // creating the new elements
    for (let key in data) {
      if (!this.keys.has(key)) {
        if (!this.requireData || typeof this.creationData[key] != 'undefined') {
          const element = new this.clz(this.creationData[key]);
          const renderer = this.renderer(element);
          this.entities.set(key, element);
          this.renderers.set(key, renderer);
          this.keys.add(key);
          this.stage.addChild(renderer);
        }
      }
    }

    // removing old elements
    for (let key of this.keys) {
      if (typeof data[key] == 'undefined') {
        this.renderers.get(key).destroy();
        this.entities.get(key).destroy();
        this.entities.delete(key);
        this.renderers.delete(key);
        this.keys.delete(key);
        this.stage.removeChild(this.renderers.get(key));
      }
    }

    // updating the elements
    for (let key in data) {
      this.entities.get(key).update(data[key]);
    }
  }
}
