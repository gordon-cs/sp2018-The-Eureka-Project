import React, { Component } from "react";
import TimerMixin from "react-timer-mixin";
import Choice from "./components/Choice";
import Prompt from "./components/Prompt";
import Timer from "./components/Timer";
import { View, StyleSheet, Platform, Text, Button } from "react-native";

export default class GamePlayScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      answeredCorrectly: [0, 0], // [choiceIDGiven, correct=1/wrong=2]
      topLeftChoice: {},
      topRightChoice: {},
      bottomLeftChoice: {},
      bottomRightChoice: {},
      promptObj: {},
      roundNumber: 0,
      newRound: false,
      resetTimer: true // Default is true, false means  ??
    };
    this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
    this.endGame = this.endGame.bind(this);
    this.newRound = this.newRound.bind(this);
  }

  async componentWillMount() {
    try {
      TimerMixin.setTimeout(() => {
        // Delay the refresh of screen so user can see the correct answer response
        this.initChoicesAndPrompt();
      }, 3500);
    } catch (error) {
      throw new Error("component will not mount");
    }
  }

  componentDidMount() {
    Array.prototype.shuffle = function() {
      var input = this;

      for (var i = input.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
      return input;
    };

    // What to do when receiving a message
    global.ws.onmessage = event => {
      // Turn every received message into a JSON immediately to access it
      var receivedMessage = JSON.parse(event.data);
      
      if (receivedMessage[0] == "choicesAndPrompt") {
        // Shuffle choices
        let shuffledChoices = receivedMessage[1].shuffle();
        // console.log("shuffledchoices = ", shuffledChoices);
        this.setState({
          isLoading: false,
          topLeftChoice: shuffledChoices[0],
          topRightChoice: shuffledChoices[1],
          bottomLeftChoice: shuffledChoices[2],
          bottomRightChoice: shuffledChoices[3],
          promptObj: receivedMessage[2],
          // roundNumber: receivedMessage[3].roundNumber,
          newRound: true
        });
      }
      // Answer Validation and Prompt Changing 
      // Turn every received message into a JSON immediately to access it

      // if it was your prompt, change ur answer to green and change ur prompt to new prompt
      else if (receivedMessage[0] == "message1") {
        // tell choice component that it is correct!
        console.log("message1:", receivedMessage[1].roundNumber);
        // Change prompt as well
        this.setState({
          answeredCorrectly: [receivedMessage[2].oldInput, 1],
          promptObj: receivedMessage[3]
        });
        TimerMixin.setTimeout(() => {
          // Delay the refresh of screen so user can see the correct answer response
          this.setState({
            answeredCorrectly: [0, 0],
            resetTimer: true
          });
        }, 750);
      }
      // if it was a different person's prompt that i answered right, then turn my answer green
      else if (receivedMessage[0] == "message2") {
        // tell choice component that it is correct!
        this.setState({ answeredCorrectly: [receivedMessage[2].oldInput, 1] });
        TimerMixin.setTimeout(() => {
          // Delay the refresh of screen so user can see the correct answer response
          this.setState({
            answeredCorrectly: [0, 0],
            resetTimer: true
          });
        }, 750);
      }
      // if someone else answered my prompt correctly! yay, change my prompt now
      else if (receivedMessage[0] == "message3") {
        console.log(
          "message3: YAY someone answered my prompt! receivedMessage:",
          receivedMessage
        );
        this.setState({
          promptObj: receivedMessage[2]
        });
      }
      // if the input i gave was incorrect
      else if (receivedMessage[0] == "message4") {
        console.log("receivedMessage4", receivedMessage);
        this.setState({ answeredCorrectly: [receivedMessage[2].oldInput, 2] }); // got it incorrect
        TimerMixin.setTimeout(() => {
          // Delay the refresh of screen so user can see the correct answer response
          this.setState({
            answeredCorrectly: [receivedMessage[2].oldInput, 0]
          });
        }, 750);
      }
      if (receivedMessage[1].roundNumber > this.state.roundNumber) {
        console.log("we shoudl change the round now, round received:", receivedMessage[1].roundNumber);
        this.initChoicesAndPrompt();
        this.setState({roundNumber: receivedMessage[1].roundNumber})
      }
      this.setState({ newRound: false });
    };
  }

  endGame() {
    const { navigate } = this.props.navigation;
    console.log("GamePlayScreen: made it to parent endGame()");
    navigate("GameOver");
  }

  wasAnsweredCorrectly(choiceIDGiven) {
    var gameID = parseInt(this.props.navigation.state.params.gameID);
    // send up the input: choice, gameID

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "input",
        gameID: gameID,
        input: choiceIDGiven
      }
    ]);
    console.log("GamePlayScreen: sentRequest", stringifiedRequest);
    global.ws.send(stringifiedRequest);
  }

  initChoicesAndPrompt() {
    var lessonID = this.props.navigation.state.params.lessonID;
    var gameID = parseInt(this.props.navigation.state.params.gameID);
    console.log(" ");

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "initChoicesAndPrompt",
      }
    ]);
    global.ws.send(stringifiedRequest);

    this.setState({
      answeredCorrectly: [0, 0],
      resetTimer: true
    });
  }

  newRound() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.splashContainer}>
          <Text style={styles.headingText}>Round {this.state.roundNumber}</Text>
        </View>
      </View>
    );
  }

  render() {
    const topLeftChoice = this.state.topLeftChoice;
    const topRightChoice = this.state.topRightChoice;
    const bottomLeftChoice = this.state.bottomLeftChoice;
    const bottomRightChoice = this.state.bottomRightChoice;
    const promptObj = this.state.promptObj;
    const promptID = this.state.promptObj.wordID;
    const answeredCorrectly = this.state.answeredCorrectly;
    const resetTimer = this.state.resetTimer;

    if (this.state.isLoading) {
      return (
        <View style={styles.splashContainer}>
          <Text style={styles.headingText}>Get ready to play!</Text>
        </View>
      );
    } else if (!this.state.isLoading) {
      return (
        <View style={styles.mainContainer}>
          <View style={styles.choicesTopContainer}>
            <Prompt promptObj={promptObj} />
          </View>
          <View style={styles.timerContainer}>
            <Timer resetTimer={resetTimer} endGame={this.endGame}/>
          </View>
          <View style={styles.choicesTopContainer}>
            <Choice
              text={topLeftChoice.Chinese}
              promptID={promptID}
              choiceID={topLeftChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly} // a function
            />
            <Choice
              text={topRightChoice.Chinese}
              promptID={promptID}
              choiceID={topRightChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly}
            />
          </View>
          <View style={styles.choicesBottomContainer}>
            <Choice
              text={bottomLeftChoice.Chinese}
              promptID={promptID}
              choiceID={bottomLeftChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly}
            />
            <Choice
              text={bottomRightChoice.Chinese}
              promptID={promptID}
              choiceID={bottomRightChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly}
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#5b3b89"
  },
  choicesTopContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  choicesBottomContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderColor: "white",
    width: 75,
    height: 75,
    backgroundColor: "white"
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    margin: 10
  },
  splashContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "white"
  }
});
