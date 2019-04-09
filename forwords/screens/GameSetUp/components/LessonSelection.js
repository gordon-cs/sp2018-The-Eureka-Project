import React, { Component } from "react";
import axios from "axios";
import { Button, StyleSheet, Text, View, Image, ActivityIndicator, Platform, ScrollView, } from "react-native";
import { httpRoute } from "../../../constants/API";

export default class LessonSelection extends Component {
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
    try {
      axios
        .get(httpRoute + "/lesson-list")
        .then(res => {
          const lessons = res.data;
          this.setState({
            isLoading: false,
            lessonList: lessons
          });
        });
    } catch (err) {
      throw new Error("/lesson-list did not work");
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const lessons = this.state.lessonList;
    const gameID = this.props.navigation.state.params.gameID;
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo
    console.log("LessonSelection: props: playerType: ", playerType);
    if (playerType !== 'solo') {
      console.log("                    gameID: ", gameID);
    }
    console.log(' ');
    let buttons;
    // If the user is playing solo
    if (playerType == 'solo') {
      buttons = lessons.map(lesson => (
        <Button
          key={lesson.lessonID}
          color="#5b3b89"
          title={'Lesson ' + lesson.lessonID + ': ' + lesson.title}
          onPress={() => navigate("Instructions", { lesson: lesson.lessonID, playerType: playerType})}
        />
      ));
    }
    // If the user is a HOST (playing with others) route them to the Lobby
    else if (playerType == 'host') {
      buttons = lessons.map(lesson => (
        <Button
          key={lesson.lessonID}
          color="#5b3b89"
          title={'Lesson ' + lesson.lessonID + ': ' + lesson.title}
          onPress={() => navigate("Lobby", { lesson: lesson.lessonID, playerType: playerType, gameID: gameID })}
        />
      ));
    }

    if (this.state.isLoading) {
      return (
        <ActivityIndicator />
      );
    } else
      return (
        <ScrollView>
          {buttons}
        </ScrollView>
      );
  }
}
