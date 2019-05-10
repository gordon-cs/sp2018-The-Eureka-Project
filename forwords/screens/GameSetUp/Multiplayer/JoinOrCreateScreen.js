import React, { Component } from "react";
import * as firebase from "firebase";
import {
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";
import forwordsStyles from '../../../constants/forwordsStyles';

export default class JoinOrCreateScreen extends Component {
  static navigationOptions = {
    title: 'Create or Join a Game'
  };
  constructor(props) {
    super(props);

    this.state = {
      gameID: ""
    };
  }

  // sending ws msg to create a gameID to backend and send returned gameID to MultiPlayerSetUp to render the next page
  createOnPress() {
    const { navigate } = this.props.navigation;
    let playerType = "host";
    navigate("GameSetUp", { playerType: playerType });
  }

  joinOnPress() {
    const { navigate } = this.props.navigation;
    const email = firebase.auth().currentUser.email;
    var playerType = "member"; // First time it is set as 'member'
    var userInputGameID = parseInt(this.state.gameID);
    // Request to join a certain group
    if (userInputGameID !== "") {
      // Only send it if it is not null
      // Request to send to the server - must be stringified.
      var stringifiedRequest = JSON.stringify([
        {
          request: "join",
          gameID: userInputGameID, // only a host can send 'create'
          email: email
        }
      ]);
      global.ws.send(stringifiedRequest);

      // Receive a message from the server about validity of gameID user sent in
      global.ws.onmessage = event => {
        /* If successful, going to receive something like this back:
        [{
          'isValidGameID': true,
        }]
        */
        let receivedMessage = JSON.parse(event.data);
        console.log(
          "JoinOrCreateScreen: joinOnPress receivedMessage:",
          receivedMessage
        );
        if (receivedMessage[0].isValidGameID) {
          navigate("Lobby", {
            gameID: userInputGameID,
            playerType: playerType
          });
        } else {
          Alert.alert(
            "Invalid Group ID",
            "Please enter the ID of a group that was already created."
          );
        }
      };
    } else if (userInputGameID == "") {
      Alert.alert(
        "Invalid Group ID",
        'You left the "Game ID" slot blank! Please enter the ID of a group that was already created.'
      );
    }
  }

  render() {
    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.flexContentContainer}
        >

          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>Multiplayer Mode</Text>
            <Image
              style={forwordsStyles.playerImage}
              source={require("../../../assets/images/people.png")}
            />
          <Text style={forwordsStyles.mainText}>
            Create your own group or join an existing one!
          </Text>
            <TouchableOpacity
              style={forwordsStyles.primaryButton}
              onPress={() => this.createOnPress()}
            >
              <Text style={forwordsStyles.buttonText}>Create a Game!</Text>
            </TouchableOpacity>
            <TextInput
              style={forwordsStyles.textInput}
              alignItems="center"
              placeholder="Group Code"
              onChangeText={gameID => this.setState({ gameID })}
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor="black"
              returnKeyType="done"
              keyboardType="number-pad"
              onSubmitEditing={() => this.joinOnPress()}
            />

            <TouchableOpacity
              style={forwordsStyles.primaryButton}
              onPress={() => this.joinOnPress()}
            >
              <Text style={forwordsStyles.buttonText}>Join Game</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }
}