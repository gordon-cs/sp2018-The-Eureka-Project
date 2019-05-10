import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import forwordsStyles from "../../constants/forwordsStyles";

export default class GameOverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
  }

  goToLaunchScreen() {
    const { navigate } = this.props.navigation;
    navigate("Home");
  }

  render() {
    const roundNumber = this.props.navigation.state.params.roundNumber;
    const score = this.props.navigation.state.params.score;
    let scoreMessage;
    if (score > 1) {
      scoreMessage = (
        <Text style={forwordsStyles.bulletText}>
          Your final score was {score} right answers!
        </Text>
      );
    } else if (score == 1) {
      scoreMessage = (
        <Text style={forwordsStyles.bulletText}>
          Your final score was just {score} right answer...
        </Text>
      );
    } else if (score == 0) {
      scoreMessage = (
        <Text style={forwordsStyles.bulletText}>
          Better luck next time, you didn't get any this time...Keep studying!
        </Text>
      );
    }
    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.flexContentContainer}
        >
          <Text style={forwordsStyles.headingText}>Game Over!</Text>
          <Text style={forwordsStyles.bulletText}>
            Great job!!! You made it to round {roundNumber}!
          </Text>
          {scoreMessage}
          <View style={forwordsStyles.headingView}>
            <TouchableOpacity
              style={forwordsStyles.primaryButton}
              onPress={() => this.goToLaunchScreen()}
            >
              <Text style={forwordsStyles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
