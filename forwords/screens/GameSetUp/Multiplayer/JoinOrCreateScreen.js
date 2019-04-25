import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default class JoinOrCreateScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      gameID: "1"
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
    var playerType = "member"; // First time it is set as 'member'
    var userInputGameID = parseInt(this.state.gameID);
    // Request to join a certain group
    if (userInputGameID !== "") {
      // Only send it if it is not null
      // Request to send to the server - must be stringified.
      var stringifiedRequest = JSON.stringify([
        {
          request: "join",
          gameID: userInputGameID // only a host can send 'create'
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
      <View style={styles.MainContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.headingView}>
            <Text style={styles.headingText}>Multiplayer Mode</Text>
            <Image
              style={styles.multiplayerImage}
              source={require("../../../assets/images/people.png")}
            />
          </View>
          <Text style={styles.mainText}>
            Create your own group or join an existing one!
          </Text>
          <View style={styles.headingView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.createOnPress()}
            >
              <Text style={styles.buttonText}>Create a Game!</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              alignItems="center"
              placeholder="Group Code"
              onChangeText={gameID => this.setState({ gameID })}
              autoCorrect={false}
              autoCapitalize="none"
              placeholderTextColor="black"
              returnKeyType="done"
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.joinOnPress()}
            >
              <Text style={styles.buttonText}>Join Game!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  contentContainer: {
    paddingTop: 30
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    margin: 10
  },
  button: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#5b3b89"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  },
  mainText: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
    color: "black"
  },
  headingView: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    flex: 1 / 4
  },
  textInput: {
    height: 60,
    width: 280,
    fontSize: 18,
    borderColor: "#5b3b89",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10
  },
  multiplayerImage: {
    width: 70,
    height: 70,
    resizeMode: "contain"
  }
});
