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
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
    };
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
          choice1: choices[arrangeArr[0]-1],
          choice2: choices[arrangeArr[1]-1],
          choice3: choices[arrangeArr[2]-1],
          choice4: choices[arrangeArr[3]-1],
        });
        console.log("choices: ", this.state.choice1, this.state.choice2, this.state.choice3, this.state.choice4);
      });
    } catch (error) {
      throw new Error('component will not mount');
    }
    console.log("GamePlayScreen: Got into componentWillMount");
  }

  render() {
    return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice1.Chinese}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice1.Chinese}
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice2.Chinese}
            </Text>
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice3.Chinese}
            </Text>
          </View>
          <View style={styles.circle}>
            <Text style={styles.answerText}>
              {this.state.choice4.Chinese}
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
