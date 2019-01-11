import SocketManager from './socketManager';

const socketManager = new SocketManager(document.getElementById('app'));
socketManager.authenticate();

