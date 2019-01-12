import { Bounds, World, Body, Bodies } from 'matter-js';
import uuid from 'uuid';
import { GAME_SIZE } from './config.json';

const GAME_BOUNDS = {
  min: {x: 0, y: 0},
  max: GAME_SIZE
};

export class Laser {

  constructor(position, direction) {
    this.body = Bodies.rectangle(
      position.x,
      position.y,
      10, 10,
      {
        frictionAir: 0,
        isSensor: true
      }
    );
    Body.setVelocity(this.body, direction);
  }

  report() {
    return {
      position: this.body.position
    };
  }
}

export default class LaserManager {

  lasers = new Map();

  constructor(world) {
    this.world = world;
    this.reportBase = {};
  }

  shoot(startPosition, direction) {
    const newLaser = new Laser(startPosition, direction);
    const id = uuid.v4();
    World.add(this.world, newLaser.body);
    this.lasers.set(id, newLaser);
    this.reportBase[id] = {position: null};
  }

  prune() {
    for (let id of Array.from(this.lasers.keys())) {
      const laser = this.lasers.get(id);
      if (!Bounds.overlaps(GAME_BOUNDS, laser.body.bounds)) {
        this.delete(id);
      }
    }
  }

  delete(id) {
    const laser = this.lasers.get(id);
    World.remove(this.world, laser.body);
    this.lasers.delete(id);
    delete this.reportBase[id];
  }

  report() {
    for (let [id, laser] of this.lasers) {
       this.reportBase[id].position = laser.body.position;
    }
    return this.reportBase;
  }
}
