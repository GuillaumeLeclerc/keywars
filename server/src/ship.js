import { Body, Bodies, Vector } from 'matter-js';

const FORCE_FACTOR = 1000
const FRICTION_AIR = 0.1;

const DIR_TO_FORCE = {
  ArrowRight: {x:FORCE_FACTOR, y:0},
  ArrowLeft: {x: -FORCE_FACTOR, y:0},
  ArrowDown: {x:0, y: FORCE_FACTOR},
  ArrowUp: {x:0, y: -FORCE_FACTOR}
};

export default class Ship {

  constructor(laserManager) {
    this.laserManager = laserManager;
    this.body = Bodies.rectangle(450, 50, 10, 10)
    this.body.frictionAir = FRICTION_AIR;
    this.shootingDirection = Vector.create(0, -10);
    Body.setVelocity(this.body, {x:0, y:0});
  }

  applyKeys(keyState) {
    for (let direction in DIR_TO_FORCE) {
      if (keyState[direction]) {
        Body.applyForce(this.body, this.body.position, DIR_TO_FORCE[direction]);
      }
    }

    if (keyState['Enter']) {
      this.laserManager.shoot(
        this.body.position,
        this.shootingDirection
      );
    }
  }

  report() {
    return {
      position: this.body.position
    };
  }
};
