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
    
    const buttons = lessons.map(lesson => (
      <Button
        key={lesson.ID}
        color="#5b3b89"
        title={'Lesson ' + lesson.ID + ': ' + lesson.Title}
        onPress={() => navigate("Instruction", { lesson: lesson.ID, isSinglePlayer: isSinglePlayer})}
      />
    ));

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
