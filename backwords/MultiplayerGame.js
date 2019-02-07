import React, { Component } from "react";
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 4000 });
var clients = [];

export default class MultiplayerGame extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        groupCode: '',
        wordsReceived: [],
        promptReceived: [],
        choiceCorrect: 0,
        groupCode: '',
        Lesson: 0,
        Players: [],
        wordsSent: [], //This is a list of words? Or counter?
        wordsUsed: [], //Same as above
        PromptIDs: [],
    }

    // this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
  };
}
  // Connect to client via ws, log the proxess of receiving and sending messages
  wss.on('connection', (ws, req) => {
    console.log('Connection accepted:', req.connection.remoteAddress.replace(/.*:/, ''), req.headers['user-agent']);
    ws.on('message', message => {
      console.log(`Received message: ${message}`);
      // Prototype statement for placing user/client into 
      // groups based off the code in the message that they send.
      if (message == '12345') {
        var index = clients.push(ws) - 1;
        clients[index].send('You are in a group!');
        this.setState(
            groupCode = '1'
        )
      }
      console.log('Current Connections: ' + clients.length);
      for (var i = 0; i < clients.length; i++) {
        clients[i] && clients[i].send('Hello Special Group!');
      }
  
    })
    ws.on('close', () => {
      console.log(`Client #${index} has disconnected`);
      delete clients[index];
      var i = clients.length - 1;
      while (clients[i] === undefined && i >= 0) {
        clients.pop();
        i--;
      }
    })
  })