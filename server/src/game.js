import { Engine, Render, Runner, World, Bodies } from 'matter-js';

import Ship from './ship';
import LaserManager from './laser';
import Borders from './borders';
import { AmmoPowerUpManager } from './powerUpManager';

const TARGET_FPS = 60;

export default class Game {
  constructor(players, gameDictPath) {
    // if (players.length != 2) {
    //   throw "This is a two players game";
    // }

    this.words = []
    this.gameDictPath = gameDictPath;

    this.engine = Engine.create();
    this.runner = Runner.create();
    this.loadGameDict();

    this.ammoPowerUpManager = new AmmoPowerUpManager(
      this.engine.world,
      this.broadcast.bind(this),
      this.words
    );

    this.laserManager = new LaserManager(this.engine.world);

    this.engine.world.gravity.x = 0;
    this.engine.world.gravity.y = 0;

    this.keyStates = players.map(player => {
      const state = {};
      player.socket.on('keydown', key => {
        state[key] = true;
      });
      player.socket.on('keyup', key => {
        state[key] = false;
      });
      return state;
    });

    this.ships = players.map((player, i) => {
      const ship = new Ship(this.laserManager, i % 2 == 0);
      player.ship = ship;
      World.add(this.engine.world, ship.body);
      player.socket.on("typed-word", word => {
        this.ammoPowerUpManager.wordTyped(word, player);
      });
      return ship;
    });

    this.borders = new Borders();
    World.add(this.engine.world, this.borders.body)

    this.players = players;
    this.lastTime = new Date().getTime();
    this.broadcast('game-start');
    this.interval = setInterval(this.step.bind(this), 1 / TARGET_FPS * 1000);
  }

  loadGameDict() {
    console.log(process.cwd());
    // const dictLoaded = require('../../assets/datasets/' + this.gameDictPath);
    const dictLoaded = require('../assets/datasets/medium-english.json');
    for (let key in dictLoaded) {
      this.words.push([key, dictLoaded[key]]);
    }
  }

  step() {
    const newTime = new Date().getTime();
    const delta = (newTime - this.lastTime) / 1000;

    for (let i = 0; i < this.players.length ; ++i) {
      this.ships[i].applyKeys(this.keyStates[i], this.engine.world);
    }

    this.ammoPowerUpManager.generate();
    this.ammoPowerUpManager.step();

    Engine.update(this.engine, delta);

    this.laserManager.prune();

    const updateReport = {
      ship: this.ships.map(x => x.report()),
      laser: this.laserManager.report(),
      powerup: this.ammoPowerUpManager.report(),
    }
    this.broadcast('game-update', updateReport);
    this.lastTime = newTime;
  }

  broadcast(name, content) {
    for (let player of this.players) {
      player.socket.emit(name, content);
    }
  }
}
