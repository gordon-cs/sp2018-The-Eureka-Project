import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import forwordsStyles from '../../../constants/forwordsStyles';

export default class Choice extends Component {
  constructor(props) {
    super(props);
    this.handleAttempt = this.handleAttempt.bind(this);
  }

  handleAttempt(answer) {
    this.props.wasAnsweredCorrectly(answer);
  }

  render() {
    const text = this.props.text;
    const choiceID = this.props.choiceID;
    const answeredCorrectly = this.props.answeredCorrectly;
    if (answeredCorrectly[1] == 0) {
      var backgroundColor = {
        backgroundColor: "white"
      };
    }

    // if it is my choiceID
    if (answeredCorrectly[0] == choiceID) {
      // if i got it correct
      if (answeredCorrectly[1] == 1) {
        backgroundColor = {
          backgroundColor: "#5cbf4a"
        };
        // if i got it incorrect
      } else if (answeredCorrectly[1] == 2) {
        backgroundColor = {
          backgroundColor: "red"
        };
      }
      // it is NOT my choiceID
    } else {
      backgroundColor = {
        backgroundColor: "white"
      };
    }
    return (
      <TouchableOpacity
        style={[forwordsStyles.individualChoiceContainer, backgroundColor]}
        onPress={() => {
          this.handleAttempt(choiceID);
        }}
      >
        <Text style={forwordsStyles.individualChoiceText}>{text}</Text>
      </TouchableOpacity>
    );
  }
}
