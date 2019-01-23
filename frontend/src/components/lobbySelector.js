import React, { Component } from 'react';
import { Table, Button } from 'antd';

// import { observable } from 'mobx';
import { observer } from 'mobx-react';

import state from '../state.js';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <Button key={record.id} onClick={() => state.joinLobby(record.id)}>Join</Button>
  )
}];



@observer
export default class LobbySelector extends Component {

  render() {
    if (state.lobbies === null) {
      return <div> Loading lobby list </div>;
    }
    return (
      <div>
        <h1>Choose your lobby</h1>
        <Table dataSource={state.lobbies} rowKey='id' columns={columns} />
      </div>
    );
  }
}

