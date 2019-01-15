import { World, Body, Bodies } from 'matter-js';
import textToPng from 'text2png';
import workerpool from 'workerpool';
import uuid from 'uuid';

import {
  GAME_SIZE,
  FONT_SIZE,
  POWERUP_PROB,
  MAX_POWERUPS
} from './config.json'

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
    );
    this.body.friction = 0;
    this.body.frictionAir = 0;
    this.body.restitution = 1;

    Body.setPosition(this.body, {
      x: GAME_SIZE.x / 2,
      y: GAME_SIZE.y / 2
    });

    // const y = Math.random() * 2 - 1;
    const y = 0;

    Body.setVelocity(this.body, {
      x: Math.sqrt(1 - y * y),
      y
    });
  }

  step() {
    // console.log(this.body.velocity);
  }
}

class PowerUpManager {

  powerUps = new Map();

  constructor(world, broadcast, words) {
    this.world = world;
    this.broadcast = broadcast;
    this.words = words;
    this.count = 0;

    this.reportBase = {};
  }

  generate() {
    if (this.count < MAX_POWERUPS && Math.random() < POWERUP_PROB) {
      this.add();
    }
  }

  generateMessage(powerUp) {
    throw "Override this class please";
  }



  async add() {
    this.count ++;
    const id = uuid.v4();
    const wordIx = Math.ceil(Math.random() * this.words.length);
    const [toDisplay, toType] = this.words[wordIx];
    const powerUp = new PowerUp(toDisplay, toType, 100, {x: 400, y:300});
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
      fontSize: FONT_SIZE,
      textToType: powerUp.textToType
    });
    this.broadcast('new-powerup', message);
  }

  report() {
    for (let [id, powerUp] of this.powerUps) {
      this.reportBase[id].position = powerUp.body.position;
    }

    return this.reportBase;
  }

  delete(id) {
    this.count --;
    const powerUp = this.powerUps.get(id);
    World.remove(this.world, powerUp.body);
    this.powerUps.delete(id);
    delete this.reportBase[id];
    this.broadcast('delete-powerup', {
      id: powerUp.id,
    });
  }

  wordTyped(word, player) {
    for (let [id, powerUp] of this.powerUps) {
      if (powerUp.textToType === word) {
        this.applyPowerUp(powerUp, player);
        this.delete(id);
        break;
      }
    }
  }

  step() {
    for (let powerUp of this.powerUps.values()) {
      powerUp.step();
    }
  }

  applyPowerUp() {
    throw "override me";
  }
}

export class AmmoPowerUpManager extends PowerUpManager {
  generateMessage() {
    return {'mesage': 'you are a cunt'};
  }

  applyPowerUp() {
    console.log('doing nothing');
  }
}

export class ShieldPowerUpManager extends PowerUpManager {
}
