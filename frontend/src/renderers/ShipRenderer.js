import * as PIXI from 'pixi.js';
import { reaction } from 'mobx';

const { Graphics } = PIXI;

const SIZE = 10;

export default function shipRenderer(ship) {
  const graphics = new Graphics();

  graphics.beginFill(0xFFFF00);
  graphics.lineStyle(1, 0xFF0000);
  graphics.drawRect(-SIZE, -SIZE, 2 * SIZE, 2 * SIZE);

  reaction(() => ship.x, (x) => {
    graphics.position.x = x;
  }, { fireImmediately: true});

  reaction(() => ship.y, (y) => {
    graphics.position.y = y;
  }, { fireImmediately: true});

  return graphics;
}
