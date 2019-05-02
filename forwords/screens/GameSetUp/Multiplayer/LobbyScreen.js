import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class LobbyScreenRoom extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      numberOfPlayers: ['1']
    };
  }

  componentDidMount() {
    var lesson = this.props.navigation.state.params.lesson;
    var gameID = this.props.navigation.state.params.gameID;
    const { navigate } = this.props.navigation;
    // What to do when receiving a message
    global.ws.onmessage = event => {
      let receivedMessage = JSON.parse(event.data);
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
      }
      if (receivedMessage[0].isGameInitialized) {
        navigate("Instructions", { gameID: gameID, lesson: lesson });
      }
    };
  }

  startGameOnPress() {
    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "initGame"
      }
    ]);
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
          <View style={forwordsStyles.iconsContainer}>{players}</View>
          <Text style={forwordsStyles.mainText}>
            {" "}
            Click Start Game when everyone is ready to go!
          </Text>
          <TouchableOpacity
            style={forwordsStyles.primaryButton}
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
          <View style={forwordsStyles.iconsContainer}>{players}</View>
        </View>
      );
    }
    return <View style={forwordsStyles.container}>{content}</View>;
  }
}
