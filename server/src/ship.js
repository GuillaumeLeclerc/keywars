import { Body, Bodies, Vector } from 'matter-js';

import { GAME_SIZE, AMMO_START } from './config.json';

const FORCE_FACTOR = 1000
const FRICTION_AIR = 0.1;

const DIR_TO_FORCE = {
  ArrowRight: {x:FORCE_FACTOR, y:0},
  ArrowLeft: {x: -FORCE_FACTOR, y:0},
  ArrowDown: {x:0, y: FORCE_FACTOR},
  ArrowUp: {x:0, y: -FORCE_FACTOR}
};

export default class Ship {

  constructor(laserManager, team) {
    this.laserManager = laserManager;
    this.ammo = AMMO_START;
    const y = team == 0 ? 50 : GAME_SIZE.y - 50; 
    this.body = Bodies.rectangle(450, y, 10, 10)
    this.body.frictionAir = FRICTION_AIR;
    const factor = team == 0 ? 1 : -1
    this.shootingDirection = Vector.create(0, factor *10);
    Body.setVelocity(this.body, {x:0, y:0});
  }

  applyKeys(keyState) {
    for (let direction in DIR_TO_FORCE) {
      if (keyState[direction]) {
        Body.applyForce(this.body, this.body.position, DIR_TO_FORCE[direction]);
      }
    }

    if (keyState['Enter'] && this.ammo > 0) {
      this.ammo--;
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
