import React, { Component } from "react";
import axios from "axios";
import TimerMixin from 'react-timer-mixin';
import Choice from "./components/Choice";
import Prompt from './components/Prompt';
import Timer from './components/Timer';
import {
  Button,
  View,
  StyleSheet,
  Platform,
} from "react-native";
import { fullRoutePrefix } from "../../constants/API";
var webSocket = new WebSocket("ws://172.27.43.141:5000");

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

  wasAnsweredCorrectly(choiceIDGiven, prompt) {
    if (choiceIDGiven === prompt) {
      this.setState({
        answeredCorrectly: [choiceIDGiven, 1],
        counter: (this.state.counter + 1), // count the number of correct answers, up to 10 correct 
      });
      TimerMixin.setTimeout(() => { // Delay the refresh of screen so user can see the correct answer response
        this.populateChoicesAndPrompt();
      }, 750);
    } else {
      this.setState({ answeredCorrectly: [choiceIDGiven, 2] }); // got it incorrect
      TimerMixin.setTimeout(() => { // Delay the refresh of screen so user can see the correct answer response
        this.setState({
          answeredCorrectly: [choiceIDGiven, 0]
        });
      }, 750);
    }
  }




  async populateChoicesAndPrompt() {
    var lesson = this.props.navigation.state.params.lesson;

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify(
      [{
        'request': 'choicesAndPrompts',
        'lesson': '' + lesson + ''
      }]
    );
    webSocket.send(stringifiedRequest);

    this.setState({
      answeredCorrectly: [0, 0],
      resetTimer: true,
    });
  }

  async componentWillMount() {
    try {
      this.populateChoicesAndPrompt();
    } catch (error) {
      throw new Error('component will not mount');
    }
  }

  render() {
    // What to do when receiving a message
    webSocket.onmessage = event => {
      // Turn every received message into a JSON immediately to access it
      let receivedMessage = JSON.parse(event.data);

      if (receivedMessage[0] == "choicesAndPrompt") {
        this.setState({
          isLoading: false,
          topLeftChoice: receivedMessage[1],
          topRightChoice: receivedMessage[2],
          bottomLeftChoice: receivedMessage[3],
          bottomRightChoice: receivedMessage[4],
          promptObj: receivedMessage[5] // Picks one of the choice ids as the prompt id
        });
      }
    }

    const topLeftChoice = this.state.topLeftChoice;
    const topRightChoice = this.state.topRightChoice;
    const bottomLeftChoice = this.state.bottomLeftChoice;
    const bottomRightChoice = this.state.bottomRightChoice;
    const promptObj = this.state.promptObj;
    const promptID = this.state.promptObj.ID;
    const answeredCorrectly = this.state.answeredCorrectly;
    const resetTimer = this.state.resetTimer;
    console.log("answeredCorrectly: ", this.state.answeredCorrectly);
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