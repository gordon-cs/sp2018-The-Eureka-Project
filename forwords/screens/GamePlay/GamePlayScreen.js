import React, { Component } from "react";
import TimerMixin from 'react-timer-mixin';
import Choice from "./components/Choice";
import Prompt from './components/Prompt';
import Timer from './components/Timer';
import {
  View,
  StyleSheet,
  Platform,
} from "react-native";

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
      counter: 1,
      resetTimer: true, // Default is true, false means  ??
    };
    this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
  }

  async componentWillMount() {
    try {
      this.initChoicesAndPrompt();
    } catch (error) {
      throw new Error('component will not mount');
    }
  }

  componentDidMount() {
    Array.prototype.shuffle = function () {
      var input = this;

      for (var i = input.length - 1; i >= 0; i--) {

        var randomIndex = Math.floor(Math.random() * (i + 1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
      }
      return input;
    }
    // What to do when receiving a message
    global.ws.onmessage = event => {
      // Turn every received message into a JSON immediately to access it
      let receivedMessage = JSON.parse(event.data);

      // console.log("GamePlayScreen: receivedMessage", receivedMessage);
      if (receivedMessage[0] == "choicesAndPrompt") {
        console.log("GamePlayScreen: receivedMessage for choicesAndPrompt receivedMessage[2]", receivedMessage[2]);

        // Shuffle choices
        receivedMessage[1].shuffle();
        this.setState({
          isLoading: false,
          topLeftChoice: receivedMessage[1][0],
          topRightChoice: receivedMessage[1][1],
          bottomLeftChoice: receivedMessage[1][2],
          bottomRightChoice: receivedMessage[1][3],
          promptObj: receivedMessage[2],
        });
      }
    }
  }

  wasAnsweredCorrectly(choiceIDGiven) {
    var gameID = parseInt(this.props.navigation.state.params.gameID);
    // send up the input: choice, gameID

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify(
      [{
        'request': 'input',
        'gameID': gameID,
        'input': choiceIDGiven
      }]
    );
    console.log("GamePlayScreen: sentRequest", stringifiedRequest);
    global.ws.send(stringifiedRequest);

    // What to do when receiving a message
    global.ws.onmessage = event => {
      /* If successful, going to receive something like this back:
      [{
        'isCorrect': true,
      }]
      */
      // Turn every received message into a JSON immediately to access it
      let receivedMessage = JSON.parse(event.data);

      console.log("GamePlayScreen: receivedMessage in wasAnsweredCorrectly, ", receivedMessage);

      // if it was your prompt, change ur answer to green and change ur prompt to new prompt
      if (receivedMessage[0] == "message1") {
          // tell choice component that it is correct! 
          // Change prompt as well
          this.setState({
            answeredCorrectly: [choiceIDGiven, 1],
            promptObj: receivedMessage[3].newPrompt
          });
          TimerMixin.setTimeout(() => { // Delay the refresh of screen so user can see the correct answer response
            this.setState({
              answeredCorrectly: [0, 0],
              resetTimer: true,
            });
          }, 750);
      }
      // if it was a different person's prompt that i answered right, then turn my answer green
      if (receivedMessage[0] == "message2") {
          // tell choice component that it is correct! 
          this.setState({answeredCorrectly: [choiceIDGiven, 1]});
          TimerMixin.setTimeout(() => { // Delay the refresh of screen so user can see the correct answer response
            this.setState({
              answeredCorrectly: [0, 0],
              resetTimer: true,
            });
          }, 750);
      }
      // if someone else answered my prompt correctly! yay, change my prompt now
      if (receivedMessage[0] == "message3") {
        this.setState({
          promptObj: receivedMessage[2].newPrompt
        });
      }
      // if the input i gave was incorrect
      if (receivedMessage[0] == "message4") {
        this.setState({ answeredCorrectly: [choiceIDGiven, 2] }); // got it incorrect
        TimerMixin.setTimeout(() => { // Delay the refresh of screen so user can see the correct answer response
          this.setState({
            answeredCorrectly: [choiceIDGiven, 0]
          });
        }, 750);
      }
  }
}


initChoicesAndPrompt() {
    var lesson = this.props.navigation.state.params.lesson;
    var gameID = parseInt(this.props.navigation.state.params.gameID);
    console.log(' ');

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify(
      [{
        'request': 'initChoicesAndPrompt',
        'lesson': lesson,
        'gameID': gameID,
      }]
    );
    global.ws.send(stringifiedRequest);

    this.setState({
      answeredCorrectly: [0, 0],
      resetTimer: true,
    });
  }


  render() {


    const topLeftChoice = this.state.topLeftChoice;
    const topRightChoice = this.state.topRightChoice;
    const bottomLeftChoice = this.state.bottomLeftChoice;
    const bottomRightChoice = this.state.bottomRightChoice;
    const promptObj = this.state.promptObj;
    const promptID = this.state.promptObj.ID;
    const answeredCorrectly = this.state.answeredCorrectly;
    const resetTimer = this.state.resetTimer;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.choicesTopContainer}>
          <Prompt promptObj={promptObj.pinyin}>
          </Prompt>
        </View>
        <View style={styles.timerContainer}>
          <Timer
            resetTimer={resetTimer}>
          </Timer>
        </View>

        <View style={styles.choicesTopContainer}>
          <Choice
            text={topLeftChoice.Chinese}
            promptID={promptID}
            choiceID={topLeftChoice.ID}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly} // a function
          >
          </Choice>
          <Choice
            text={topRightChoice.Chinese}
            promptID={promptID}
            choiceID={topRightChoice.ID}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
        </View>
        <View style={styles.choicesBottomContainer}>
          <Choice
            text={bottomLeftChoice.Chinese}
            promptID={promptID}
            choiceID={bottomLeftChoice.ID}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
          <Choice
            text={bottomRightChoice.Chinese}
            promptID={promptID}
            choiceID={bottomRightChoice.ID}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: '#5b3b89'
  },
  choicesTopContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  choicesBottomContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    borderColor: 'white',
    width: 75,
    height: 75,
    backgroundColor: 'white',
  },
});