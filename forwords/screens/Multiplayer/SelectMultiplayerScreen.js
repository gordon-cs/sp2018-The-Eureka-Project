import React, { Component } from "react";
import { Button, StyleSheet, Text, View, } from "react-native";
// export { backwordsIP } from '../../constants';
// const ws = new WebSocket('ws://172.20.10.2:4000');
const ws = new WebSocket('ws://192.168.0.17:4000');
// SelectMultiplayerScreen.js 
// Author: Ezekiel Martinez
// This screen allows a user to be able to create a new group
// or join an existing group by entering a code. This accomplished
// by sending specific messages to the backend via ws.

export default class SelectMultiplayerScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  joinOnPress() {
    const { navigate } = this.props.navigation;
    let playerType = 'member';
    navigate("MultiplayerSetUp", { ws: ws, playerType: playerType})
  }
  // sending ws msg to create a groupID to backend and send returned groupId to MultiPlaterSetUp to render the next page
  createOnPress() {
    const { navigate } = this.props.navigation;
    let playerType = 'host';
    var newMessage = 'create';
    ws.send(newMessage);
    
    let groupId ;
    ws.onmessage = function(e) {
      groupId = e.data;
      console.log('Received message:', groupId)
      navigate("MultiplayerSetUp", { ws: ws, groupID: groupId ,playerType: playerType });

    }
      // Navigate to create screen that allows you to specify attributes of a game?
      
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.headingView}>
          <Text style={styles.mainText}>
            Join an existing group or create your own group!            </Text>
        </View>
        <Button style={styles.button}
          title='Join Game!'
          onPress={() => this.joinOnPress()}
          color='purple'
        />
        <Button style={styles.button}
          title='Create Game!'
          onPress={() => this.createOnPress()} // Ideally this will also lead to this player going to a wait screen.
          color='purple'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  button: {},
  headingText: {
    fontWeight: "bold",
    fontSize: 30
  },
  mainText: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  headingView: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  icon: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    fontSize: 80
  }
});
