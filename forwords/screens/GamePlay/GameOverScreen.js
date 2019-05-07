import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";

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
        <Text style={styles.bulletText}>Your final score was {score} right answers!</Text>
      );
    } else if (score == 1) {
      scoreMessage = (
        <Text style={styles.bulletText}>Your final score was just {score} right answer...</Text>
      );
    } else if (score == 0) {
      scoreMessage = (
        <Text style={styles.bulletText}>Better luck next time, you got none right...Keep studying!</Text>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.mainContainer}>
            <Text style={styles.headingText}>Game Over!</Text>
            <Text style={styles.bulletText}>Great job!!! You made it to round {roundNumber}!</Text>
            {scoreMessage}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.goToLaunchScreen()}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contentContainer: {
    paddingTop: 30
  },
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#fff"
  },
  headingText: {
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 50,
    fontSize: 50,
    color: "black",
    fontWeight: "bold"
  },
  bulletText: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 25,
    marginRight: 25,
    fontSize: 25,
    color: "#5b3b89"
  },
  button: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#5b3b89"
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    borderRadius: 80,
    margin: 10
  },
  buttonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  }
});
