import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import forwordsStyles from '../../../constants/forwordsStyles';

export default class LobbyScreenRoom extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      numberOfPlayers: []
    };
  }

  componentDidMount() {
    var lesson = this.props.navigation.state.params.lesson;
    var gameID = this.props.navigation.state.params.gameID;
    const { navigate } = this.props.navigation;

    // What to do when receiving a message
    global.ws.onmessage = event => {
      let receivedMessage = JSON.parse(event.data);
      console.log("LobbyScreen: Received message:", receivedMessage);
      /* If successful, going to receive something like this back:
          [{
          'isGameInitialized': true,
          }]
      */
      /* If successful, going to receive something like this back:
          [{
          'numberOfPlayers': 3,
          }]
      */
      if (receivedMessage[0].numberOfPlayers !== undefined) {
        this.setState({ numberOfPlayers: receivedMessage[0].numberOfPlayers });
        console.log(
          "LobbyScreen: numberOfPlayers: ",
          this.state.numberOfPlayers
        );
      }

      if (receivedMessage[0].isGameInitialized) {
        navigate("Instructions", { gameID: gameID, lesson: lesson });
      }
    };
  }

  startGameOnPress() {
    // console.log("LobbyScreen: props: playerType: ", playerType);
    console.log(" ");
    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "initGame"
      }
    ]);
    console.log("LobbyScreen: startGameOnPress", stringifiedRequest);
    global.ws.send(stringifiedRequest);
  }

  render() {
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo
    var gameID = this.props.navigation.state.params.gameID;
    let content;

    let players = this.state.numberOfPlayers.map(player => (
      <Image
        key={player}
        style={forwordsStyles.playerImage}
        source={require("../../../assets/images/personIcon.png")}
      />
    ));

    // If the user is a HOST (playing with others)
    if (playerType == "host") {
      content = (
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>
            {" "}
            You are the host of Group {gameID}
          </Text>
          <Text style={forwordsStyles.mainText}>
            {" "}
            Invite others to play in your group – they can enter the code:{" "}
            {gameID}
          </Text>
          <Text style={forwordsStyles.mainText}>
            {" "}
            Click Start Game when everyone is ready to go!
          </Text>
          <View styles={styles.iconContainer}>
            {players}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.startGameOnPress()}
          >
            <Text style={forwordsStyles.buttonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      );
    }
    // If the user is a member (not the game creator, just someone who joined)
    else if (playerType == "member") {
      // show list of players who are waiting in the room
      // let host enter the room with the same gameID
      // then host clicks play when eveyone is ready
      content = (
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>
            {" "}
            You are a member of Group {gameID}
          </Text>
          <Text style={forwordsStyles.subheadingText}>
            {" "}
            Waiting for the host to start the game once everyone is in!
          </Text>
          <View styles={styles.iconContainer}>
            {players}
          </View>
        </View>
      );
    }
    return <View style={forwordsStyles.container}>{content}</View>;
  }
}
const styles = StyleSheet.create({
  iconsContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  subheadingText: {
    alignItems: "center",
    margin: 10,
    fontSize: 20,
    color: "black"
  },
  singlePlayerImage: {
    width: 50,
    height: 50,
    resizeMode: "contain"
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
  }
});
