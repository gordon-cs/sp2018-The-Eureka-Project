import React, { Component } from "react";
import lesson from '../../../services/lesson'
import { ActivityIndicator, ScrollView, TouchableOpacity, Text, } from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";

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

  async componentDidMount() {
    let lessonList = await lesson.getLessons();
    this.setState({ isLoading: false, lessonList });
  }

  createGame(lessonID) {
    const { navigate } = this.props.navigation;
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "create",
        lessonID: lessonID
      }
    ]);
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
      if (playerType == "solo") {
        navigate("Instructions", {
          lesson: lessonID,
          gameID: gameID,
          playerType: playerType
        });
      }
      if (playerType == "host") {
        navigate("Lobby", {
          lesson: lessonID,
          gameID: gameID,
          playerType: playerType
        });
      }
    };
  }

  render() {
    const lessons = this.state.lessonList;
    let buttons;
    buttons = lessons.map(lesson => (
      <TouchableOpacity
        key={lesson.lessonID}
        style={forwordsStyles.narrowLongButton}
        onPress={() => this.createGame(lesson.lessonID)}
      >
        <Text style={forwordsStyles.buttonText}>
          {"Lesson " + lesson.lessonID + ": " + lesson.title}
        </Text>
      </TouchableOpacity>
    ));

    if (this.state.isLoading) {
      return <ActivityIndicator />;
    } else return <ScrollView>{buttons}</ScrollView>;
  }
}
