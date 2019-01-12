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
