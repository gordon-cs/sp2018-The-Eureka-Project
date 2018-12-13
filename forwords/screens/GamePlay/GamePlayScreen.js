import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Platform
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
      prompt: [],
      choice1: '',
      choice2: '',
      choice3: '',
    };
  }

  // Generate random integer from 1 to 4 (hard-coded)
  randomNumGen() {
    let randNum = Math.floor(Math.random()*4)+1;
    return randNum;
  }

  /* Create a list of 4 unique numbers
   * If a number is already in the list, then generate a unique number
   */
  checkDuplicates() {
    let numList = [];
    while (numList.length < 4) {
      let potential = this.randomNumGen();
      while (numList.includes(potential)){
        potential = this.randomNumGen();
      }
      numList.push(potential);
    }    
    return numList;
  }

  async componentWillMount() {
    try {
      // Will eventually need a parameter in the URL for different word IDs
      await axios.get('http://' + backwordsIP + ':8080' + '/word').then(res => {
        const word = res.data;
        this.setState({
          isLoading: false,
          prompt: word[0]
        });
        console.log("prompt: ", this.state.prompt);
      });
      // Will eventually need a parameter for the specific lesson to pull from
      await axios.get('http://' + backwordsIP + ':8080' + '/choices').then(res => {
        const choices = res.data;
        this.setState({
          isLoading: false,
          choice1: choices[0],
          choice2: choices[1],
          choice3: choices[2],
        });
        console.log("choices: ", choices);
      });
    } catch (error) {
      throw new Error('/word did not work');
    }
    console.log("GamePlayScreen: Got into componentWillMount");
    let length;
    await axios.get('http://' + backwordsIP + ':8080' + '/lesson-words/11').then(res => {
      length = res.data.length;
      // length = res.data[0].COUNT(*); // Does not recognize 'COUNT(*)' as column header
    });
    console.log("array length: ", length);
    console.log("4 unique numbers: ", this.checkDuplicates());
  }

  render() {
    return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.prompt.Chinese}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.prompt.Chinese}
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice1.Chinese}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice2.Chinese}
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice3.Chinese}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    flex: 1,
    flexDirection: 'row',
    margin: 100,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "white"
  },
  answerText: {
    fontSize: 24,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  }
});
