import React, { Component } from "react";
import axios from "axios";
import Choice from "./components/Choice";
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform
} from "react-native";

export default class GamePlayScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lessonList: []
    };
  }

  async componentWillMount() {
    console.log("GamePlayScreen: Got into componentDidMount");
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Choice text="苹果" promptID="1" choiceID="1">
        </Choice>
        <Choice text="飞翔" promptID="1" choiceID="2">
        </Choice>
        <Choice text="你好" promptID="1" choiceID="3">
        </Choice>
        <Choice text="西瓜" promptID="1" choiceID="4">
        </Choice>
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
