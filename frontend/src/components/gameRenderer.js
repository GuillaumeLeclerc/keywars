import React, { Component, createRef } from 'react';
import { observer } from 'mobx-react';

import { Input } from 'antd';

import state from '../state.js';

@observer
class TypingRenderer extends Component {

  static style = {
    width: '800px'
  }

  render() {
    if (state.game === null) {
      return <div>Game Not started yet</div>;
    }

    let status = "Moving";
    if (state.game.typingManager.content !== "") {
      status = "Typing";
    }

    return (<Input
      style={TypingRenderer.style}
      addonBefore={status}
      value={state.game.typingManager.content} />
    );
  }
}

@observer
class ShipRenderer extends Component {
  render() {
    return <div>Display ship amo here </div>;
  }
}

@observer
class HUDRenderer extends Component {

  render() {
    if (state.game === null) {
      return null;
    }

    console.log(state.game.trackers[0].entities);

    return (
      <div>
        {Array.from(state.game.trackers[0].entities.values()).map(x => (
          <ShipRenderer ship={x} />
        ))}
      </div>
    );
  }
}

export default class GameRenderer extends Component {

  constructor(props) {
    super(props)
    this.content = React.createRef();
  }

  componentDidMount() {
    state.provideGameContainer(this.content.current);
  }

  render() {
    return (
      <div>
        <HUDRenderer />
        <div ref={this.content}>
        </div>
        <TypingRenderer />

      </div>
    );
  }
}
