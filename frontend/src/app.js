import React, { Component }from 'react';
import { observer } from 'mobx-react';

import state from './state.js';
import Auth from './components/auth.js';
import LobbySelector from './components/lobbySelector.js';
import GameRenderer from './components/gameRenderer.js';

@observer
export default class app extends Component {
  render() {
    if (!state.loggedIn) {
      return <Auth />;
    }
    if (state.lobby === null) {
      return <LobbySelector/>
    }
    if (state.inGame) {
      return <GameRenderer/>
    }
    return (
      <div>Waiting for players in your selected lobby</div>
    );
  }
}
