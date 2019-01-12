import * as PIXI from 'pixi.js';
import { reaction } from 'mobx';

const { Graphics } = PIXI;

const SIZE = 3;

export default function laserRenderer(entity) {

  const graphics = new Graphics();

  graphics.beginFill(0xFFFF00);
  graphics.lineStyle(1, 0xFF0000);
  graphics.drawRect(-5, -5, 10, 10);

  reaction(() => entity.x, (x) => {
    graphics.position.x = x;
  }, { fireImmediately: true});

  reaction(() => entity.y, (y) => {
    graphics.position.y = y;
  }, { fireImmediately: true});

  return graphics;
}
