import WebFont from 'webfontloader'
import SocketManager from './socketManager';
import React from 'react';
import ReactDom from 'react-dom';


import 'antd/dist/antd.css';
import powerupFont from '../dist/whitrabt.ttf';
import toto from '../dist/Antaro.ttf';

import App from './app.js';

const socketManager = new SocketManager(document.getElementById('app'));

const query = WebFont.load({
  custom: {
    families: [toto]
  },
  active: e => {
    ReactDom.render(<App />, document.getElementById('main'));
    // socketManager.authenticate();
  }
});
