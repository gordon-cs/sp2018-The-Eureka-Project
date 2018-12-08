import React, { Component } from "react";
import axios from "axios";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
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
      prompt: '',
      choice1: '',
      choice2: '',
      choice3: '',
    };
  }

  async componentWillMount() {
    try {
      axios.get('http://' + backwordsIP + ':8080' + '/word').then(res => {
        console.log(res.data)
      });
    } catch (error) {
      throw new Error('/word did not work');
    }
    console.log("GamePlayScreen: Got into componentWillMount");
  }

  render() {
    return (
      <View style={styles.mainContainer}>
      <View style={styles.circle}>
          <Text style={styles.answerText}>西瓜</Text>
        </View>

        <View style={styles.circle}>
          <Text style={styles.answerText}>🍏</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.answerText}>🍒</Text>
        </View> 
        <View style={styles.circle}>
          <Text style={styles.answerText}>🍌</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.answerText}>🍉</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: "white"
  },
  answerText: {
    fontSize: 60,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  }
});
