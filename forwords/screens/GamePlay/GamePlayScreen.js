import React, { Component } from "react";
import axios from "axios";
import TimerMixin from 'react-timer-mixin';
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
      topLeftChoice: {},
      topRightChoice: {},
      bottomLeftChoice: {},
      bottomRightChoice: {},
      promptID: '',
      counter: 1,
      //timer: null,
    };
    this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
  }

  // gameTimerTicker(){
  //   this.setState({
  //     counter: this.state.counter - 1
  //   });
  // }
  wasAnsweredCorrectly(choiceIDGiven, prompt) {
    const {navigate} = this.props.navigation;
    if (choiceIDGiven === prompt) {
      this.setState({ answeredCorrectly: [choiceIDGiven, 1] }); // got it correct
       this.setState({counter: this.state.counter + 1}); count the number of correct answers, up to 10 correct
      if (this.state.counter === 10) {
        navigate('SinglePlayerModeSelection')
      }
else {
      TimerMixin.setTimeout(() => {
        this.populateChoices();
      }, 750);
} // Delay the refresh of screen so user can see the correct answer response
    } else {
      this.setState({ answeredCorrectly: [choiceIDGiven, 2] }); // got it incorrect
    }
  }

  // Generate random integer from 1 to lesson length
  randomNumGen(lessonLength) {
    let randNum = Math.floor(Math.random() * lessonLength) + 1;
    return randNum;
  }

  /* Create a list of 4 unique numbers
   * If a number is already in the list, then generate a unique number
   */
  fourWordsPicker(lessonLength) {
    let numList = [];
    while (numList.length < 4) {
      let potential = this.randomNumGen(lessonLength);
      while (numList.includes(potential)) {
        potential = this.randomNumGen(lessonLength);
      }
      numList.push(potential);
    }
    return numList;
  }

  async populateChoices() {
    // Hard coded lesson 22
    let length;
    await axios.get('http://' + backwordsIP + ':8080' + '/lesson-words/22').then(res => {
      lessonLength = res.data.length;
      console.log(lessonLength)
    });
    var fourWords = this.fourWordsPicker(lessonLength); // Array of four words ids, eg. 5,2,17,11
    var shuffleSQLRows = this.fourWordsPicker(4); // Randomize order of fourSQLWordObjects returned

    //Hard coded Lesson 22
    await axios.get('http://' + backwordsIP + ':8080' + '/choices/22/ ' + fourWords[0] + '/' + fourWords[1] + '/' + fourWords[2] + '/' + fourWords[3]).then(res => {
      const fourSQLWordObjects = res.data; // SQL will always return an ordered array, eg. 5,2,17,11 -> SQL -> 2,5,11,17
      this.setState({
        isLoading: false,
        topLeftChoice: fourSQLWordObjects[shuffleSQLRows[0] - 1],
        topRightChoice: fourSQLWordObjects[shuffleSQLRows[1] - 1],
        bottomLeftChoice: fourSQLWordObjects[shuffleSQLRows[2] - 1],
        bottomRightChoice: fourSQLWordObjects[shuffleSQLRows[3] - 1],
        promptID: this.randomNumGen(4) // Picks one of the choice ids as the promtp id
      });
    });
    console.log(this.state.promptID)
    this.setState({ answeredCorrectly: [0, 0] });
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
      this.populateChoices();
      // let timer = setInterval(this.tick, 1000);
      // this.setState({timer});
    } catch (error) {
      throw new Error('component will not mount');
    }
  }

  // componentWillUnmount() {
  //   this.clearInterval(this.state.timer);
  // }
  render() {
    const topLeftChoice = this.state.topLeftChoice;
    const topRightChoice = this.state.topRightChoice;
    const bottomLeftChoice = this.state.bottomLeftChoice;
    const bottomRightChoice = this.state.bottomRightChoice;
    const promptID = this.state.promptID;
    const answeredCorrectly = this.state.answeredCorrectly;

    let promptObj;
    switch (promptID) {
      case 1:
        promptObj = topLeftChoice.Pinyin;
        break;
      case 2:
        promptObj = topRightChoice.Pinyin;
        break;
      case 3:
        promptObj = bottomLeftChoice.Pinyin;
        break;
      default:
        promptObj = bottomRightChoice.Pinyin;

    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.choicesTopContainer}>
          <Prompt promptObj={promptObj}>
          </Prompt>
        </View>
        <View style={styles.choicesTopContainer}>
          <Choice
            text={topLeftChoice.Chinese}
            promptID={promptID}
            choiceID={1}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly} // a function
          >
          </Choice>
          <Choice
            text={topRightChoice.Chinese}
            promptID={promptID}
            choiceID={2}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
        </View>
        <View style={styles.choicesBottomContainer}>
          <Choice
            text={bottomLeftChoice.Chinese}
            promptID={promptID}
            choiceID={3}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}>
          </Choice>
          <Choice
            text={bottomRightChoice.Chinese}
            promptID={promptID}
            choiceID={4}
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
