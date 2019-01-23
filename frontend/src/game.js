import * as PIXI from 'pixi.js'

import Entity2D from './entities/2DEntity';
import PowerUp from './entities/PowerUp';
import shipRenderer from './renderers/ShipRenderer';
import laserRenderer from './renderers/laserRenderer'
import powerUpRenderer from './renderers/powerUpRender';
import typingRenderer from './renderers/typingRenderer';
import TypingManager from './TypingManager';
import ShipControlsManager from './shipControlsManager';
import RemoteEntityTracker from './remoteEntityTracker';


export default class Game {

  constructor(socket, container) {
    this.socket = socket;
    this.app = new PIXI.Application(800, 600, {
      backgroundColor : 0x1099bb
    });

    this.typingManager = new TypingManager(word => {
      socket.emit('typed-word', word);
    });
    this.typingManager.attach();

    this.shipControlsManager = new ShipControlsManager(this.socket);
    // TODO detach
    this.shipControlsManager.attach();

    this.trackers = [
      new RemoteEntityTracker(
        'ship',
        Entity2D,
        shipRenderer,
        this.app.stage,
        this.socket
      ),
      new RemoteEntityTracker(
        'laser',
        Entity2D,
        laserRenderer,
        this.app.stage,
        this.socket
      ),
      new RemoteEntityTracker(
        'powerup',
        PowerUp,
        powerUpRenderer,
        this.app.stage,
        this.socket
      )
    ];

    // TODO remove
    container.appendChild(this.app.view);

    // this.app.stage.addChild(typingRenderer(this.typingManager));

    this.socket.on('game-update', this.update.bind(this));

    this.socket.on('new-powerup', ({textToType, id}) => {
      this.typingManager.registerWord(id, textToType);
    })

    this.socket.on('delete-powerup', ({id}) => {
      this.typingManager.discardWord(id);
    });
  }

  update(state) {
    for (let tracker of this.trackers) {
      tracker.update(state[tracker.name]);
    }
  }
}
