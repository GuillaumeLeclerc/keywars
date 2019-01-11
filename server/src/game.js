import { Engine, Render, Runner, World, Bodies } from 'matter-js';

import Ship from './ship';

const TARGET_FPS = 60;

export default class Game {
  constructor(players) {
    // if (players.length != 2) {
    //   throw "This is a two players game";
    // }

    this.engine = Engine.create();
    this.runner = Runner.create();

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

    this.ships = players.map(player => {
      const ship = new Ship();
      World.add(this.engine.world, ship.body);
      return ship;
    });

    this.players = players;
    this.lastTime = new Date().getTime();
    this.broadcast('game-start');
    this.interval = setInterval(this.step.bind(this), 1 / TARGET_FPS * 1000);
  }

  step() {
    const newTime = new Date().getTime();
    const delta = (newTime - this.lastTime) / 1000;

    for (let i = 0; i < this.players.length ; ++i) {
      this.ships[i].applyKeys(this.keyStates[i]);
    }

    Engine.update(this.engine, delta);
    const updateReport = {
      ships: this.ships.map(x => x.report())
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
