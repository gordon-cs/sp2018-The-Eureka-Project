import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import forwordsStyles from "../../constants/forwordsStyles";

export default class GameOverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      roundNumber: parseInt(this.props.navigation.getParam("roundNumber", 1)),
      score: this.props.navigation.getParam("score", 'error')
    };
  }

  goToLaunchScreen() {
    var resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: "Tabs"
        })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  componentWillMount() {}

  render() {
    const score = this.state.score;
    const roundNumber = this.state.roundNumber;

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
    } else if (score == 'error') {
      scoreMessage = (
        null
      );
    }
    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.flexContentContainer}
        >
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>Game Over!</Text>
          <Text style={forwordsStyles.bulletText}>
            Great job!!! You made it to round {roundNumber}!
          </Text>
          {scoreMessage}
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
