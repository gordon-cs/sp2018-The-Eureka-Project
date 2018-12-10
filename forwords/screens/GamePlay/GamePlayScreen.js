import React, { Component } from "react";
import axios from "axios";
import Choice from "./components/Choice";
import Prompt from './components/Prompt';
import { StyleSheet, View, Platform } from "react-native";

export default class GamePlayScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lessonList: [],
      answeredCorrectly: '0',
      topLeftText: 'tL:苹果',
      topRightText: 'tR:飞翔',
      bottomLeftText: 'bL:你好',
      bottomRightText: 'bR:西瓜',
      promptID: '1',
    };
    this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
  }


  wasAnsweredCorrectly(answer, prompt) {
    if (answer === prompt) {
      this.setState({ answeredCorrectly: '1' });
    } else {
      this.setState({ answeredCorrectly: '2' });
    }
    console.log("I got it right?: ", this.state.answeredCorrectly);
  }



  render() {
    const topLeftText = this.state.topLeftText;
    const topRightText = this.state.topRightText;
    const bottomLeftText = this.state.bottomLeftText;
    const bottomRightText = this.state.bottomRightText;
    const promptID = this.state.promptID;
    const answeredCorrectly = this.state.answeredCorrectly;

    return (
      <View style={styles.mainContainer}>
        <Prompt>
        </Prompt>
        <View style={styles.choicesTopContainer}>
          <Choice
            text={topLeftText}
            promptID={promptID}
            choiceID="1"
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly} // a function
          >
          </Choice>
          <Choice
            text={topRightText}
            promptID={promptID}
            choiceID="2"
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
        </View>
        <View style={styles.choicesBottomContainer}>
          <Choice
            text={bottomLeftText}
            promptID={promptID}
            choiceID="3"
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
          <Choice
            text={bottomRightText}
            promptID={promptID}
            choiceID="4"
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
    justifyContent: "center",
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  choicesTopContainer: {
    justifyContent: "center",
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    // paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  choicesBottomContainer: {
    justifyContent: "center",
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    // paddingTop: Platform.OS === "ios" ? 20 : 0
  },
});
