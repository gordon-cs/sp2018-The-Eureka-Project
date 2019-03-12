import React, { Component } from "react";
import { Button, StyleSheet, Text, View, Platform, TextInput, } from "react-native";
import GameSelection from '../../components/GameSelection';

// ReadyScreen.js
// This screen allows a player to be able to view their group code
// and then tell or show other players so that they may be able to join.
// It also will allow the host player to set different attributes of the game.
// When every player has pressed the ready button, the game will then start.

export default class MultiplayerSetUp extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      groupCode: '',
    };
  }
  
  readyOnPress() {
    const { navigate } = this.props.navigation;
    var ws = this.props.navigation.state.params.ws;
    var newMessage = 'ready' + this.props.navigation.state.params.groupID;
    ws.send( newMessage );
    ws.onmessage = e => {
      console.log('Received message:', e.data)
      }
    if (this.props.navigation.state.params.playerType == 'host') 
      {
      navigate('SinglePlayerModeSelection')
      }
    else if(this.props.navigation.state.params.playerType == 'member') 
      {
      navigate('WaitingScreen', {ws:ws, groupID: this.props.navigation.state.params.groupID, playerType: this.props.navigation.state.params.playerType})
      }
    
    // Navigate to multiplayer gameplay screen
  }
  joinOnPress() {
    const { navigate } = this.props.navigation;
    var ws = this.props.navigation.state.params.ws;
    groupCode = this.state.groupCode;
    var newMessage = 'join' + groupCode;
    ws.send( newMessage );
    ws.onmessage = e => {
      console.log('Received message:', e.data)
      navigate('WaitingScreen', {ws:ws, groupID: groupCode, playerType: this.props.navigation.state.params.playerType})
    }
    //navigate("GamePlayScreen", {ws:ws, play})
    // Navigate to multiplayer gameplay screen
  }

  // This screen should also allow a user to specify different
  // attributes of the game they are about to play.
  render() {
    const { navigate } = this.props.navigation;
    let content;
    if (this.props.navigation.state.params.playerType == 'member') {
      content = (
        <View style={styles.container}>
          <View style={styles.headingView}>
            <Text style={styles.mainText}>
              Enter an existing group code:
            </Text>
          </View>
          <TextInput
            style={{ height: 60, width: 300 }}
            alignItems='center'
            placeholder="Group Code"
            onChangeText={(groupCode) => this.setState({ groupCode })}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
          <Button style={styles.button}
            title='Join!'
            onPress={() => this.joinOnPress()}
            color='purple'
          />
        </View>
      );
    }
    // if the PlayerType is host, then render the screen with current groupId that the host created
    else if (this.props.navigation.state.params.playerType == 'host') {
      let groupId = this.props.navigation.state.params.groupID;
      content = (
        <View style={styles.container}>
          <View style={styles.headingView}>
            <Text style={styles.mainText}>
              You are the game host! Your group code is:
              {groupId} {"\n"}

              Your friends can join if they enter this code!
            </Text>
            <Text style={styles.mainText}>
              Press the button when you're ready to play!
            </Text>
          </View>
          <Button style={styles.button}
            title='Ready!'
            onPress={() => this.readyOnPress()}
            color='purple'
          />
        </View>
      );
    }
    return (
      <View>
        {content}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainText: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
  },
  button: {},
  headingText: {
    fontWeight: "bold",
    fontSize: 30
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
