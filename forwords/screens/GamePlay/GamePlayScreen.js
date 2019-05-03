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
      resetTimer: true,
      score: 0,
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
        this.setState({
          isLoading: false,
          topLeftChoice: shuffledChoices[0],
          topRightChoice: shuffledChoices[1],
          bottomLeftChoice: shuffledChoices[2],
          bottomRightChoice: shuffledChoices[3],
          promptObj: receivedMessage[2],
        });
      }
      // Answer Validation and Prompt Changing 
      // Turn every received message into a JSON immediately to access it

      // if it was your prompt, change ur answer to green and change ur prompt to new prompt
      else if (receivedMessage[0] == "message1") {
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
        this.setState({
          promptObj: receivedMessage[2]
        });
      }
      // if the input i gave was incorrect
      else if (receivedMessage[0] == "message4") {
        this.setState({ answeredCorrectly: [receivedMessage[2].oldInput, 2] }); // got it incorrect
        TimerMixin.setTimeout(() => {
          // Delay the refresh of screen so user can see the correct answer response
          this.setState({
            answeredCorrectly: [receivedMessage[2].oldInput, 0]
          });
        }, 750);
      }
      else if (receivedMessage[0] == 'score') {
        console.log("this.state.score=", this.state.score);
        this.setState({ score: receivedMessage[0].score });
      }
      if (receivedMessage[1].roundNumber > this.state.roundNumber) {
        this.newRound(receivedMessage[1].roundNumber);
      }
    };
  }


  newRound(newRoundNumber) {
    this.setState({
      newRound: true, 
      roundNumber: newRoundNumber,
    });
    this.initChoicesAndPrompt();

    TimerMixin.setTimeout(() => {
      this.setState({newRound: false});
    }, 2000);

  }

  endGame() {
    const { navigate } = this.props.navigation;
    navigate("GameOver", {roundNumber: this.state.roundNumber});
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
    global.ws.send(stringifiedRequest);
  }

  initChoicesAndPrompt() {

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

  render() {
    const topLeftChoice = this.state.topLeftChoice;
    const topRightChoice = this.state.topRightChoice;
    const bottomLeftChoice = this.state.bottomLeftChoice;
    const bottomRightChoice = this.state.bottomRightChoice;
    const promptObj = this.state.promptObj;
    const promptID = this.state.promptObj.wordID;
    const answeredCorrectly = this.state.answeredCorrectly;
    const resetTimer = this.state.resetTimer;
    if (this.state.isLoading && this.state.roundNumber == 0 && !this.state.newRound) {
      return (
        <View style={styles.splashContainer}>
          <Text style={styles.headingText}>Get ready to play!</Text>
        </View>
      );
    } else if (this.state.newRound) {
      return (
        <View style={styles.splashContainer}>
          <Text style={styles.headingText}>You have advanced to round {this.state.roundNumber}</Text>
        </View>
      );    
    } else if (!this.state.isLoading && !this.state.newRound) {
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
              text={topLeftChoice.targetLangauge}
              promptID={promptID}
              choiceID={topLeftChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly} // a function
            />
            <Choice
              text={topRightChoice.targetLangauge}
              promptID={promptID}
              choiceID={topRightChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly}
            />
          </View>
          <View style={styles.choicesBottomContainer}>
            <Choice
              text={bottomLeftChoice.targetLangauge}
              promptID={promptID}
              choiceID={bottomLeftChoice.wordID}
              answeredCorrectly={answeredCorrectly}
              wasAnsweredCorrectly={this.wasAnsweredCorrectly}
            />
            <Choice
              text={bottomRightChoice.targetLangauge}
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
