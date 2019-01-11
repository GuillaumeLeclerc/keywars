import { Body, Bodies } from 'matter-js';

const FORCE_FACTOR = 10000;
const FRICTION_AIR = 0.1;

const DIR_TO_FORCE = {
  ArrowRight: {x:FORCE_FACTOR, y:0},
  ArrowLeft: {x: -FORCE_FACTOR, y:0},
  ArrowDown: {x:0, y: FORCE_FACTOR},
  ArrowUp: {x:0, y: -FORCE_FACTOR}
};

export default class Ship {

  constructor() {
    this.body = Bodies.rectangle(450, 50, 80, 80)
    console.log(this.body);
    this.body.frictionAir = FRICTION_AIR;
    Body.setVelocity(this.body, {x:0, y:0});
  }

  applyKeys(keyState) {
    for (let direction in keyState) {
      if (keyState[direction]) {
        console.log("moving", direction)
        Body.applyForce(this.body, this.body.position, DIR_TO_FORCE[direction]);
      }
    }
  }

  report() {
    return {
      position: this.body.position
    };
  }
};
