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
    const isSinglePlayer = (this.props.navigation.state.params.isSinglePlayer);
    const groupID = (this.props.navigation.state.params.groupID);
    const playerType = this.props.navigation.state.params.playerType; // host or member
    console.log("lessonSelection: props: isSinglePlayer: ", isSinglePlayer, "playerType: ", playerType);
    let buttons;
    // If the user is playing solo
    if (isSinglePlayer && playerType == 'host') {
      buttons = lessons.map(lesson => (
        <Button
          key={lesson.ID}
          color="#5b3b89"
          title={'Lesson ' + lesson.ID + ': ' + lesson.Title}
          onPress={() => navigate("Instructions", { lesson: lesson.ID, isSinglePlayer: isSinglePlayer, groupID: groupID })}
        />
      ));
    }
    // If the user is a HOST (playing with others) route them to the Lobby
    else if (playerType == 'host') {
      buttons = lessons.map(lesson => (
        <Button
          key={lesson.ID}
          color="#5b3b89"
          title={'Lesson ' + lesson.ID + ': ' + lesson.Title}
          onPress={() => navigate("Lobby", { lesson: lesson.ID, isSinglePlayer: isSinglePlayer, playerType: playerType, groupID: groupID })}
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
