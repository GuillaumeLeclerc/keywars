import { Composite, Body, Bodies, Vector } from 'matter-js';
import {
  GAME_SIZE,
  BORDER_SIZE,
  NO_MANS_LAND_SIZE,
  NO_MANS_LAND_BORDER_SIZE
} from './config.json';

export default class Borders {

  constructor(laserManager) {
    this.laserManager = laserManager;
    this.body = Composite.create();
    this.body = Bodies.rectangle(
        GAME_SIZE.x + BORDER_SIZE / 2, GAME_SIZE.y / 2,
        BORDER_SIZE, 2 * BORDER_SIZE + GAME_SIZE.y,
        { isStatic: true, restitution: 1})
    console.log(        GAME_SIZE.x + BORDER_SIZE / 2, GAME_SIZE.y / 2,
        BORDER_SIZE, 2 * BORDER_SIZE + GAME_SIZE.y,
);
  }


  report() {
    return {};
  }
};
