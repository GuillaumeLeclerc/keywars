import { Composite, Body, Bodies, Vector } from 'matter-js';
import {
  GAME_SIZE,
  BORDER_SIZE,
  NO_MANS_LAND_SIZE
} from './config.json';

export default class Borders {

  constructor(laserManager) {
    this.laserManager = laserManager;
    this.body = Composite.create();
    const parts = [
      Bodies.rectangle(
        GAME_SIZE.x / 2, -BORDER_SIZE / 2,
        2 * BORDER_SIZE + GAME_SIZE.x, BORDER_SIZE,
      { isStatic: true }),
      Bodies.rectangle(
        GAME_SIZE.x / 2, GAME_SIZE.y + BORDER_SIZE / 2,
        2 * BORDER_SIZE + GAME_SIZE.x, BORDER_SIZE,
        { isStatic: true }),
      Bodies.rectangle(
        -BORDER_SIZE / 2, GAME_SIZE.y / 2,
        BORDER_SIZE, 2 * BORDER_SIZE + GAME_SIZE.y,
        { isStatic: true }),
      Bodies.rectangle(
        GAME_SIZE.x + BORDER_SIZE / 2, GAME_SIZE.y / 2,
        BORDER_SIZE, 2 * BORDER_SIZE + GAME_SIZE.y,
        { isStatic: true }),
      Bodies.rectangle(
        GAME_SIZE.x / 2, GAME_SIZE.y / 2,
        GAME_SIZE.x + 2 * BORDER_SIZE, NO_MANS_LAND_SIZE,
        { isStatic: true}
      )
    ]

    for (let part of parts) {
      Composite.add(this.body, part);
    }
  }

  report() {
    return {};
  }
};
