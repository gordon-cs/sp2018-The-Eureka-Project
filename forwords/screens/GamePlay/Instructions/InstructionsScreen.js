import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import TimerMixin from "react-timer-mixin";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class InstructionScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  async componentWillMount() {
    const { navigate } = this.props.navigation;
    const lesson = this.props.navigation.state.params;
    const gameID = this.props.navigation.state.params.gameID;
    const playerType = this.props.navigation.state.params.playerType;
    if (playerType != "solo") {
      try {
        TimerMixin.setTimeout(() => {
          // Delay the refresh of screen so user can see the correct answer response
          navigate("GamePlay", { lesson: lesson.ID, gameID: gameID });
        }, 15000);
      } catch (error) {
        throw new Error("component will not mount");
      }
    }
  }

  // For solo users only
  proceedOnPress() {
    const { navigate } = this.props.navigation;
    const lesson = this.props.navigation.state.params.lesson;
    const gameID = this.props.navigation.state.params.gameID;
    navigate("GamePlay", { lesson: lesson, gameID: gameID });
  }

  render() {
    // const playerType = this.props.navigation.state.params.playerType;
    const playerType = "solo";
    if (playerType == "solo") {
      return (
        <View style={forwordsStyles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={forwordsStyles.instructionsContainer}>
              <View style={forwordsStyles.headingView}>
                <Text style={forwordsStyles.headingText}>How To Play</Text>
              </View>
              <Text style={forwordsStyles.bulletText}>
                1. Read the prompt at the top
              </Text>
              <Text style={forwordsStyles.bulletText}>
                2. Select the correct answer from the choices at the bottom
              </Text>
              <View style={forwordsStyles.headingView}>
                <TouchableOpacity
                  style={forwordsStyles.primaryButton}
                  onPress={() => this.proceedOnPress()}
                >
                  <Text style={forwordsStyles.buttonText}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={forwordsStyles.instructionsContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={forwordsStyles.instructionsContainer}>
              <View style={forwordsStyles.headingView}>
                <Text style={forwordsStyles.headingText}>How To Play</Text>
              </View>
              <Text style={forwordsStyles.bulletText}>
                1. Everyone gets a prompt at the top, with answer options at the
                bottom.
              </Text>
              <Text style={forwordsStyles.bulletText}>
                2. The trick is, the answers are most likely on one of your
                teammates' screens!
              </Text>
              <Text style={forwordsStyles.bulletText}>
                3. Say your prompt out loud in your target language in order for
                them to click the right option on their screen.
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}
