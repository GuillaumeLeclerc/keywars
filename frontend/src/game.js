import * as PIXI from 'pixi.js'

import Ship from './entities/Ship';
import shipRenderer from './renderers/ShipRenderer';
import typingRenderer from './renderers/typingRenderer';
import TypingManager from './TypingManager';
import ShipControlsManager from './shipControlsManager';


export default class Game {

  constructor(socket, container) {
    this.socket = socket;
    this.app = new PIXI.Application(800, 600, {
      backgroundColor : 0x1099bb
    });

    this.ships = [new Ship(true)];

    this.typingManager = new TypingManager();
    this.typingManager.attach();

    this.shipControlsManager = new ShipControlsManager(this.socket);
    this.shipControlsManager.attach();

    container.appendChild(this.app.view);

    for (let ship of this.ships) {
      this.app.stage.addChild(shipRenderer(ship));
    }

    this.app.stage.addChild(typingRenderer(this.typingManager));

    this.socket.on('game-update', this.update.bind(this));
  }

  update(state) {
    this.ships.forEach((ship, i) => {
      ship.update(state.ships[i]);
    });
  }
}
