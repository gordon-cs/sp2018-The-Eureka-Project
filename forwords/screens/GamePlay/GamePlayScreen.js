import React, { Component } from "react";
import axios from "axios";
import TimerMixin from 'react-timer-mixin';
import Choice from "./components/Choice";
import Prompt from './components/Prompt';
import {
  Text,
  View,
  Image,
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
      hintText: '?',
      hintUsed: false,
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
      TimerMixin.setTimeout(() => { // After one second the wrong answer selection goes back to a white background
        this.setState({ answeredCorrectly: [choiceIDGiven, 0] });
      }, 1000);
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

  /** 
   * Call Google Cloud Translate API on the server to translate the text in the prompt bar
   * ChineseText - the text to be sent to the server and translated
   * Result: sets state of hintText to be the translated text received from the server
   */
  async translateText(ChineseText) {
    this.setState({ hintUsed: true }); 
    // Call to the backend to use the Google Cloud Translate API with this ChineseText
    await axios.get(fullRoutePrefix + '/translate/' + ChineseText).then(res => {
      translation = res.data; // The translation that comes back
    });
    this.setState({ hintText: translation }); // Change Hint button to the English translation provided by the server
    TimerMixin.setTimeout(() => { // After a delay, remove the Google Translate attribution 
      this.setState({ hintText: '?' }), this.setState({ hintUsed: false });
    }, 3000);
  }

  async populateChoices() {
    var lesson = this.props.navigation.state.params.lesson; 
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
      hintUsed: false,
      hintText: '?',
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
    let promptChinese;
    switch (promptID) {
      case 1:
        promptObj = topLeftChoice.Pinyin;
        promptChinese = topLeftChoice.Chinese;
        break;
      case 2:
        promptObj = topRightChoice.Pinyin;
        promptChinese = topRightChoice.Chinese;
        break;
      case 3:
        promptObj = bottomLeftChoice.Pinyin;
        promptChinese = bottomLeftChoice.Chinese;
        break;
      default:
        promptObj = bottomRightChoice.Pinyin;
        promptChinese = bottomRightChoice.Chinese;
    }
    if (this.state.hintUsed) {
      var attribution = (
        <Image source={require('./img/color-regular.png')} />
      )
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.promptContainer}>
          <Prompt promptObj={promptObj}>
          </Prompt>
        </View>
        <View style={styles.helpAndAttributionContainer}>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => { this.translateText(promptChinese)}}>
            <Text style={styles.helpText}>{this.state.hintText}</Text>
          </TouchableOpacity>
          {attribution}
        </View>
        <View style={styles.choicesTopContainer}>
          <Choice
            text={topLeftChoice.Chinese}
            promptID={promptID}
            choiceID={1}
            answeredCorrectly={answeredCorrectly}
            wasAnsweredCorrectly={this.wasAnsweredCorrectly}
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
  promptContainer: {
    flex: 1,
    flexDirection: 'row',
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
  helpAndAttributionContainer: {
    alignItems: "center",
    flexDirection: 'column',
    // width: 100,
    // height: 100,
    flex: 1,
    borderRadius: 80,
    margin: 10,
    
  },
  helpButton: {
    justifyContent: "center",
    flexDirection: 'column',
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 80,
    backgroundColor: "white"
  },
  helpText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});