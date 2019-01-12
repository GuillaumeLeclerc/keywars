import WebFont from 'webfontloader'
import SocketManager from './socketManager';

import powerupFont from '../dist/whitrabt.ttf';
import toto from '../dist/Antaro.ttf';

const socketManager = new SocketManager(document.getElementById('app'));

const query = WebFont.load({
  custom: {
    families: [toto]
  },
  active: e => {
    socketManager.authenticate();
  }
});

const el = document.createElement('div');
const font = `"${toto}"`;
console.log(powerupFont);
el.style.fontFamily = font;
el.style.fontSize = "50px";
el.innerText = "Hello world";
document.body.appendChild(el);

