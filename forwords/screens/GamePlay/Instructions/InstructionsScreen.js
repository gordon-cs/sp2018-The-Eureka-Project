import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView
} from "react-native";
import TimerMixin from "react-timer-mixin";

export default class InstructionScreen extends React.Component {
  static navigationOptions = {
    title: 'Instructions',
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
    const playerType = this.props.navigation.state.params.playerType;
    if (playerType == "solo") {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.mainContainer}>
              <Text style={styles.headingText}>How To Play</Text>
              <Text style={styles.bulletText}>
                1. Read the prompt at the top
              </Text>
              <Text style={styles.bulletText}>
                2. Select the correct answer from the choices at the bottom
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.proceedOnPress()}
                >
                  <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={styles.mainContainer}>
              <Text style={styles.headingText}>How To Play</Text>
              <Text style={styles.bulletText}>
                1. Everyone gets a prompt at the top, with answer options at the
                bottom.
              </Text>
              <Text style={styles.bulletText}>
                2. The trick is, the answers are most likely on one of your
                teammates' screens!
              </Text>
              <Text style={styles.bulletText}>
                3. Say your prompt out loud in  your target language in order for them to
                click the right option on their screen.
              </Text>
              {/*
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate("GamePlay", { lesson: lesson.ID, gameID: gameID })}
            >
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
          */}
            </View>
          </ScrollView>
        </View>
      );
    }
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
