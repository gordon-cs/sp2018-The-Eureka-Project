import React, { Component } from "react";
import { Platform, Text, View, ScrollView, Image } from "react-native";
import LessonSelection from "./components/LessonSelection";
import forwordsStyles from "../../constants/forwordsStyles";

export default class GameSetUpScreen extends Component {
  static navigationOptions = {
    title: "Game Setup"
  };
  constructor(props) {
    super(props);
  }

  render() {
    const playerType = this.props.navigation.state.params.playerType; // host, member, or solo
    let content;

    // If the user is playing solo
    if (playerType == "solo") {
      content = (
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>Single Player Mode</Text>
          <Image
            style={forwordsStyles.playerImage}
            source={require("../../assets/images/person.png")}
          />
          <Text style={forwordsStyles.mainText}>
            Select a lesson to play with!
          </Text>
        </View>
      );
    }
    // If the user is a HOST (playing with others)
    else if (playerType == "host") {
      content = (
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>Multiplayer Mode</Text>
          <Image
            style={forwordsStyles.playerImage}
            source={require("../../assets/images/people.png")}
          />
          <Text style={forwordsStyles.mainText}>
            You will receive a group code once you select a lesson!
          </Text>
          <Text style={forwordsStyles.mainText}>
            Select a lesson for your group to play with!
          </Text>
        </View>
      );
    }
    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.specialContainer}
        >
          {content}
          <LessonSelection
            navigation={this.props.navigation}
            playerType={playerType}
          />
        </ScrollView>
      </View>
    );
  }
}
