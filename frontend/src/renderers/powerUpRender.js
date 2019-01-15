import * as PIXI from 'pixi.js';
import { reaction } from 'mobx';

import powerupFont from '../../dist/Antaro.ttf';

const { Container, Graphics, Text, TextStyle } = PIXI;

const STYLE = new TextStyle({
    fontFamily: "Comic Sans MS"
});

export default function powerUpRenderer(entity) {

  const graphics = new Container();
  const box = new Graphics();

  box.beginFill(0xFFFF00);
  box.lineStyle(1, 0x00FF00);
  const { dimensions } = entity;

  const text = new PIXI.Text(entity.toDisplay, {
    fontFamily: powerupFont,
    fontSize: entity.fontSize + 'px'
  });

  const { width, height } = text.getBounds();
  console.log(text.getBounds())
  console.log(dimensions)

  box.drawRect(
    0, 0,
    dimensions.width, dimensions.height
  );
  box.position.x = - dimensions.width / 2;
  box.position.y = - dimensions.height / 2;
  text.position.x = - dimensions.width / 2 + (dimensions.width - width) / 2;
  text.position.y = - dimensions.height / 2+ (dimensions.height - height) / 2;

  graphics.addChild(box);
  graphics.addChild(text);

  reaction(() => entity.x, (x) => {
    graphics.position.x = x;
  }, { fireImmediately: true});

  reaction(() => entity.y, (y) => {
    graphics.position.y = y;
  }, { fireImmediately: true});

  return graphics;
}
