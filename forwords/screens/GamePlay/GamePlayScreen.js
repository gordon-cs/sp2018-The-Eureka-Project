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
  TouchableOpacity,
} from "react-native";
import { fullRoutePrefix } from "../../constants/API";
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
    };
    this.wasAnsweredCorrectly = this.wasAnsweredCorrectly.bind(this);
  }

  async componentWillMount() {
    try {
      this.populateChoices();
    } catch (error) {
      throw new Error('component will not mount');
    }
  }

  wasAnsweredCorrectly(choiceIDGiven, prompt) {
    const { navigate } = this.props.navigation;
    if (choiceIDGiven === prompt) {
      this.setState({
        answeredCorrectly: [choiceIDGiven, 1],
        counter: (this.state.counter + 1), // count the number of correct answers, up to 10 correct 
      });
      TimerMixin.setTimeout(() => { // Delay the refresh of screen so user can see the correct answer response
        this.populateChoices();
      }, 750);
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

  /* Call Google Cloud Translate API to translate the text in the prompt bar
  *  returns translated text
  */
  async translateText(q) {
    console.log("in translateText(q) with q = ", q);
    await axios.get(fullRoutePrefix + '/translate/' + q).then(res => {
      translation = res.data;
      console.log("translation: ", res.data);
    });
    console.log("at the end of translateText(q)!");
  }

  async populateChoices() {
    /* Hardcoding to lesson 5 for testing.
    var lesson = this.props.navigation.state.params.lesson; 
    */
    var lesson = 5;
    await axios.get(fullRoutePrefix + '/lesson-words/' + lesson).then(res => {
      lessonLength = res.data.length;
    });
    var fourWords = this.fourWordsPicker(lessonLength); // Array of four words ids, eg. 5,2,17,11
    var shuffleSQLRows = this.fourWordsPicker(4); // Randomize order of fourSQLWordObjects returned
    await axios.get(fullRoutePrefix + '/choices/' + lesson + '/ ' + fourWords[0] + '/' + fourWords[1] + '/' + fourWords[2] + '/' + fourWords[3]).then(res => {
      const fourSQLWordObjects = res.data; // SQL will always return an ordered array, eg. 5,2,17,11 -> SQL -> 2,5,11,17
      this.setState({
        isLoading: false,
        topLeftChoice: fourSQLWordObjects[shuffleSQLRows[0] - 1],
        topRightChoice: fourSQLWordObjects[shuffleSQLRows[1] - 1],
        bottomLeftChoice: fourSQLWordObjects[shuffleSQLRows[2] - 1],
        bottomRightChoice: fourSQLWordObjects[shuffleSQLRows[3] - 1],
        promptID: this.randomNumGen(4) // Picks one of the choice ids as the prompt id
      });
    });
    this.setState({
      answeredCorrectly: [0, 0],
    });
  }

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
        <View style={styles.timerContainer}>
          <TouchableOpacity
            style={styles.helpContainer}
            onPress={() => {
              console.log("Pressed '?' --> THE PROMPT TEXT RN IS: ", promptObj);
            }}
          //onPress={() => {translate(promptObj);}}

          >
            <Text style={styles.helpText}>?</Text>
          </TouchableOpacity >
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
  helpContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    width: 50,
    height: 50,
    borderRadius: 80,
  },
  helpText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});