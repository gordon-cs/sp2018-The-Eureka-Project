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
      lessonList: [],
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


createGame(lessonID) {
    const { navigate } = this.props.navigation;
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify(
      [{
        'request': 'create',
        'lessonID': lessonID
      }]
    );
    console.log(`LessonSelection: Sent message: ${stringifiedRequest}`);
    global.ws.send(stringifiedRequest);
    
    // Receive a message from the server about what your gameID is
    global.ws.onmessage = event => {
      /* If successful, going to receive something like this back:
      [{
        'gameID': 1234,
      }]
      */
        console.log("LessonSelection: receivedMessage: ", event.data);
        let receivedMessage = JSON.parse(event.data);
        let gameID = receivedMessage[0].gameID;
        if (playerType == 'solo') {
          navigate("Instructions", { lesson: lessonID, gameID: gameID, playerType: playerType });
        }
        if (playerType == 'host') {
          navigate("Lobby", { lesson: lessonID,  gameID: gameID, playerType: playerType });
        }
      }
    }

  render() {
    const lessons = this.state.lessonList;
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo
    console.log("LessonSelection: props: playerType: ", playerType);
    console.log(' ');
    let buttons;
    // If the user is playing solo
    if (playerType == 'solo') {
      buttons = lessons.map(lesson => (
        <Button
          key={lesson.lessonID}
          color="#5b3b89"
          title={'Lesson ' + lesson.lessonID + ': ' + lesson.title}
          onPress={() => this.createGame(lesson.lessonID)}
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
          onPress={() => this.createGame(lesson.lessonID)}
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
