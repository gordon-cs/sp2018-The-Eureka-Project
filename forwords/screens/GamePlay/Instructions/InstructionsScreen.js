import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity
} from "react-native";

export default class InstructionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      openToReceivingMessages: true,
    }
  }

  // For solo users only
  proceedOnPress() {
    const { navigate } = this.props.navigation;
    const lesson = this.props.navigation.state.params.lesson;
    
    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify(
      [{
        'request': 'create',
        'lesson': lesson
      }]
    );
    console.log(`InstructionsScreen: Sent message: ${stringifiedRequest}`);
    global.ws.send(stringifiedRequest);
    
    // Receive a message from the server about what your gameID is
    global.ws.onmessage = event => {
      /* If successful, going to receive something like this back:
      [{
        'gameID': 1234,
      }]
      */
      if (this.state.openToReceivingMessages) {
        console.log(`InstructionsScreen: receivedMessage: ${event.data}`);
        let receivedMessage = JSON.parse(event.data);
        let gameID = receivedMessage[0].gameID;
        navigate("GamePlay", { lesson: lesson, gameID: gameID })
        this.setState({ openToReceivingMessages: false });
      }
    }
  }


  render() {
    const { navigate } = this.props.navigation;
    const lesson = this.props.navigation.state.params;
    const gameID = this.props.navigation.state.params.gameID;
    const playerType = this.props.navigation.state.params.playerType;
    if (playerType == 'solo') {
      return (
        <View style={styles.mainContainer}>
          <Text style={styles.headingText}>How To Play</Text>
          <Text style={styles.bulletText}>1. Read the prompt at the top</Text>
          <Text style={styles.bulletText}>
            2. Select the correct answer from the choices at the bottom
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.proceedOnPress()}
            >
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.mainContainer}>
          <Text style={styles.headingText}>How To Play</Text>
          <Text style={styles.bulletText}>
            1. Everyone gets a prompt at the top, with answer options at the
            bottom.
          </Text>
          <Text style={styles.bulletText}>
            2. The trick is, the answers are most likely on one of your
            teammates' screens!
          </Text>
          <Text style={styles.bulletText}>
            3. Say your prompt out loud in Chinese in order for them to click
            the right option on their screen.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("GamePlay", { lesson: lesson.ID, gameID: gameID })}
            >
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fff"
  },
  headingText: {
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 50,
    fontSize: 50,
    color: "black",
    fontWeight: "bold"
  },
  bulletText: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    fontSize: 25,
    color: "#5b3b89"
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
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    borderRadius: 80,
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  },
});
