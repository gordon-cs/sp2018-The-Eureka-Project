import React, { Component } from "react";
import { Button, StyleSheet, Text, View, TextInput, Alert, } from "react-native";

export default class JoinOrCreateScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      groupID: '',
    };
  }
  joinOnPress() {
    const { navigate } = this.props.navigation;
    const isSinglePlayer = this.props.navigation.state.params.isSinglePlayer;
    let playerType = 'member'; // First time it is set as 'member' 
    let groupID = this.state.groupID; // First time it is set as 'member'     
    console.log("JoinOrCreateScreen: props: isSinglePlayer: ", isSinglePlayer, "playerType: ", playerType);
    // Can't press 'Join Game!' without entering in a valid groupID 
    if (groupID !== '') { 
      navigate("Lobby", { isSinglePlayer: isSinglePlayer, playerType: playerType, groupID: groupID })
    } 
    else { // have to make check for whether the group exists or not yet. will have to do ws!
      Alert.alert('Invalid Group ID', 'Please enter the ID of a group that already exists.');
    }
  }
  // sending ws msg to create a groupID to backend and send returned groupId to MultiPlaterSetUp to render the next page
  createOnPress() {
    const { navigate } = this.props.navigation;
    let playerType = 'host';
    let isSinglePlayer = false;

    global.ws.send('create');

    // Navigate to GameSetUpScreen that allows you to specify lesson of a game
    global.ws.onmessage = event => {
      console.log("JoinOrCreateScreen: Received message: ", event.data);
      let groupID = event.data;
      console.log('groupID: ', groupID)
      navigate("GameSetUp", { groupID: groupID, playerType: playerType, isSinglePlayer: isSinglePlayer });
    }

  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.headingView}>
          <Text style={styles.headingText}>Multiplayer Mode</Text>
        </View>
        <Text style={styles.mainText}>Create your own group or join an existing one!</Text>
        <View style={styles.headingView}>
          <Button style={styles.button}
            title='Create Game!'
            onPress={() => this.createOnPress()} // Ideally this will also lead to this player going to a wait screen.
            color='purple'
          />
          <TextInput
            style={{ height: 60, width: 300 }}
            alignItems='center'
            placeholder="Group Code"
            onChangeText={(groupID) => this.setState({ groupID })}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
          <Button style={styles.button}
            title='Join Game!'
            onPress={() => this.joinOnPress()}
            color='purple'
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: 'black',
    margin: 10,
  },
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
    marginBottom: 20,
    flex: 1 / 4,
  },
  icon: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    fontSize: 80
  }
});
