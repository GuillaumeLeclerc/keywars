import { World, Body, Bodies } from 'matter-js';
import textToPng from 'text2png';
import workerpool from 'workerpool';
import uuid from 'uuid';

import { FONT_SIZE } from './config.json'

import fs from 'fs';

const pool = workerpool.pool();


function renderText(text, fontSize) {
  const result = require('text2png')(text, {
    font: `${fontSize} Space`,
    localFontPath: '../frontend/dist/Antaro.ttf',
    localFontName: 'Space'
  });

  const sizeOf = require('buffer-image-size');
  const dimensions = sizeOf(result);
  delete dimensions['type'];
  return [dimensions, result]
}

function render(text) {
  return pool
    .exec(renderText, [text, FONT_SIZE])
    .then(([dims, x]) => [dims, Buffer.from(x)]);
}

class PowerUp {

  constructor(toDisplay, textToType, ttl, position) {
    this.toDisplay = toDisplay;
    this.textToType = textToType;
    this.ttl = ttl;
    this.position = position;
  }

  async prepare(){
    const [dimensions, image] = await render(this.toDisplay);
    this.image = image;
    this.dimensions = dimensions;

    this.body = Bodies.rectangle(
      this.position.x, this.position.y,
      this.dimensions.width,
      this.dimensions.height,
      {
        isSensor: true,
        isStatic: true
      }
    );
  }
}

class PowerUpManager {

  powerUps = new Map();

  constructor(world, broadcast) {
    this.world = world;
    this.reportBase = {};
    this.broadcast = broadcast;

    setTimeout(() => {
      this.add();
    }, 1000);
  }

  generateMessage(powerUp) {
    throw "Override this class please";
  }

  async add() {
    const id = uuid.v4();
    const powerUp = new PowerUp('you are a cunt', 'hoho', 100, {x: 400, y:300});
    await powerUp.prepare();
    this.powerUps.set(id, powerUp);
    World.add(this.world, powerUp.body);
    this.reportBase[id] = {position: null};
    const message = this.generateMessage(powerUp);
    Object.assign(message, {
      id,
      position: powerUp.body.position,
      dimensions: powerUp.dimensions,
      toDisplay: powerUp.toDisplay,
      fontSize: FONT_SIZE
    });
    this.broadcast('new-powerup', message);
  }

  report() {
    for (let [id, powerUp] of this.powerUps) {
      this.reportBase[id].position = powerUp.body.position;
    }

    return this.reportBase;
  }
}

export class AmmoPowerUpManager extends PowerUpManager {
  generateMessage() {
    return {'mesage': 'you are a cunt'};
  }
}

export class ShieldPowerUpManager extends PowerUpManager {
}
