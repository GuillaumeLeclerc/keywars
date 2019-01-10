import * as PIXI from 'pixi.js'

import Ship from './entities/Ship';
import TypingManager from './TypingManager';

import shipRenderer from './renderers/ShipRenderer';
import typingRenderer from './renderers/typingRenderer';

const { Rectangle } = PIXI;
var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});

document.body.appendChild(app.view);

const { stage } = app;

const typingManager = new TypingManager();
const myShip = new Ship(true);
const otherShip = new Ship(false);

stage.addChild(shipRenderer(myShip));
stage.addChild(shipRenderer(otherShip));
stage.addChild(typingRenderer(typingManager));

typingManager.attach();


app.ticker.add(function(delta) {
});
