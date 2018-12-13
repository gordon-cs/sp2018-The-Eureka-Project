import React, { Component } from "react";
import axios from "axios";
import Choice from "./components/Choice";
import Prompt from './components/Prompt';
import {
  Text,
  View,
  StyleSheet,
  Platform,
} from "react-native";

var backwordsIP = '172.27.43.141';

export default class GamePlayScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lessonList: [],
      answeredCorrectly: [0, 0], // [choiceIDGiven, correct=1/wrong=2]
      topLeftText: '',
      topRightText: '',
      bottomLeftText: '',
      bottomRightText: '',
      promptID: 1,
    };
    this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
  }

  wasAnsweredCorrectly(choiceIDGiven, prompt) {
    if (choiceIDGiven === prompt) {
      this.setState({ answeredCorrectly: [choiceIDGiven, 1] }); // got it correct
    } else {
      this.setState({ answeredCorrectly: [choiceIDGiven, 2] }); // got it incorrect
    }
  }

  // Generate random integer from 1 to lesson length
  randomNumGen(lessonLength) {
    let randNum = Math.floor(Math.random()*lessonLength)+1;
    return randNum;
  }

  /* Create a list of 4 unique numbers
   * If a number is already in the list, then generate a unique number
   */
  fourWordsPicker(lessonLength) {
    let numList = [];
    while (numList.length < 4) {
      let potential = this.randomNumGen(lessonLength);
      while (numList.includes(potential)){
        potential = this.randomNumGen(lessonLength);
      }
      numList.push(potential);
    }    
    return numList;
  }

  async componentWillMount() {
    try {
      // Will eventually need this for multiplayer to update just a single word
      // await axios.get('http://' + backwordsIP + ':8080' + '/word/1').then(res => {
      //   const word = res.data;
      //   this.setState({
      //     isLoading: false,
      //     prompt: word[0]
      //   });
      //   console.log("prompt: ", this.state.prompt);
      // });
      
      // Hard coded lesson 11
      let length;
      await axios.get('http://' + backwordsIP + ':8080' + '/lesson-words/11').then(res => {
        length = res.data.length;
      });
      console.log("array length: ", length);
      var array = this.fourWordsPicker(length);
      var arrangeArr = this.fourWordsPicker(4); // Randomize order of choices returned
      console.log("Pick arrangement", arrangeArr);
      // Will eventually need a parameter for the specific lesson to pull from
      await axios.get('http://' + backwordsIP + ':8080' + '/choices/11/ ' + array[0] + '/' + array[1] + '/' + array[2] + '/' + array [3]).then(res => {
        const choices = res.data;
        this.setState({
          isLoading: false,
          topLeftText: choices[arrangeArr[0]-1].Chinese,
          topRightText: choices[arrangeArr[1]-1].Chinese,
          bottomLeftText: choices[arrangeArr[2]-1].Chinese,
          bottomRightText: choices[arrangeArr[3]-1].Chinese,
        });
      });
    } catch (error) {
      throw new Error('component will not mount');
    }
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
            choiceID={1}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly} // a function
          >
          </Choice>
          <Choice
            text={topRightText}
            promptID={promptID}
            choiceID={2}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
        </View>
        <View style={styles.choicesBottomContainer}>
          <Choice
            text={bottomLeftText}
            promptID={promptID}
            choiceID={3}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
          <Choice
            text={bottomRightText}
            promptID={promptID}
            choiceID={4}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
      {/* <View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.topLeftText.Chinese}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.topLeftText.Chinese}
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.topRightText.Chinese}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.bottomLeftText.Chinese}
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.bottomRightText.Chinese}
            </Text>
          </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: '#5b3b89'
  },
  choicesTopContainer: {
    justifyContent: "center",
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    // flexDirection: 'row',
    // margin: 100,
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
