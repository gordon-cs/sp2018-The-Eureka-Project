import React, { Component } from "react";
import { Button, StyleSheet,Text, View, Platform,} from "react-native";

// ReadyScreen.js
// Author: Ezekiel Martinez
// This screen allows a user to be able to view their group code
// and then tell or show other users so that they may be able to join.
// It also will allow(?) user's to set different attributes of the game.
// When every player has pressed the ready button, the game will then start.

export default class JoinMultiplayerScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
    readyOnPress() {
        const { navigate } = this.props.navigation;
        var ws = this.props.navigation.state.params.ws;
        ws.send('ready' + this.props.navigation.state.params.groupID);
        ws.onmessage = e => {
            console.log('Received message:', e.data)
        }
        // Navigate to multiplayer gameplay screen
    }
    // This screen should also allow a user to specify different
    // attributes of the game they are about to play.
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingView}>
            <Text style={styles.mainText}>
              Your group code is {this.props.navigation.state.params.groupID}
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
        </ScrollView>
      </View>
    );
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
