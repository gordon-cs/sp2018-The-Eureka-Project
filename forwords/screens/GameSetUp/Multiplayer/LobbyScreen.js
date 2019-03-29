import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";

export default class LobbyScreenRoom extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      numberOfPlayers: 0,
    };
  }

  startGameOnPress() {
    var gameID = this.props.navigation.state.params.gameID;
    var lesson = this.props.navigation.state.params.lesson;
    // console.log("LobbyScreen: props: playerType: ", playerType);
    console.log(" ");
    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "initGame",
        gameID: gameID,
        lesson: "" + lesson + ""
      }
    ]);
    console.log("LobbyScreen: startGameOnPress",stringifiedRequest);
    global.ws.send(stringifiedRequest);
  }

  render() { // MOVE ALL THIS TO CONSTRUCTOR
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo
    var gameID = this.props.navigation.state.params.gameID;
    var lesson = this.props.navigation.state.params.lesson;
    let content;
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
      this.setState({ numberOfPlayers: receivedMessage[0].numberOfPlayers })
      console.log("LobbyScreen: numberOfPlayers: ", this.state.numberOfPlayers);
     }

    if (receivedMessage[0].isGameInitialized) {
      console.warn("made it in 'isGameInitialized'");
      navigate("Instructions", { gameID: gameID, lesson: lesson });
    }
    };

    // If the user is a HOST (playing with others)
    if (playerType == "host") {
      content = (
        <View style={styles.headingView}>
          <Text style={styles.headingText}>
            {" "}
            You are the host of Group {gameID}
          </Text>
          <Text style={styles.subheadingText}>
            {" "}
            Click Play when everyone is ready to go!
          </Text>
          <Image
            style={styles.singlePlayerImage}
            source={require("../../../assets/images/person.png")}
          />
          {/*Array.from(Array(this.state.numberOfPlayers)).map(() =>
            <Text>💆</Text>
          )*/}
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.startGameOnPress()}
          >
            <Text style={styles.buttonText}>Start Game</Text>
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
        <View style={styles.headingView}>
          <Text style={styles.headingText}>
            {" "}
            You are a member of Group {gameID}
          </Text>
          <Text style={styles.subheadingText}>
            {" "}
            Waiting for the host to start the game once everyone is in!
          </Text>
          {/*Array.from(Array(this.state.numberOfPlayers)).map(() =>
            <Text>💆</Text>
          )*/}
        </View>
      );
    }
    return <View style={styles.MainContainer}>{content}</View>;
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fff"
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black"
  },
  headingView: {
    alignItems: "center"
  },
  mainText: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 25,
    color: "black",
    fontWeight: "bold"
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black"
  },
  subheadingText: {
    alignItems: "center",
    margin: 10,
    fontSize: 20,
    color: "black"
  },
  singlePlayerImage: {
    width: 30,
    height: 55,
    flex: 1,
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
