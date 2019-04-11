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

  // For solo users only
  goToLaunchScreen() {
    const { navigate } = this.props.navigation;

    // Request to send to the server - must be stringified.
    var stringifiedRequest = JSON.stringify([
      {
        request: "endGame",
      }
    ]);
    global.ws.send(stringifiedRequest);



    console.log("trying to go to home screen");
    navigate("Home");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.mainContainer}>
            <Text style={styles.headingText}>Game Over!</Text>
            <Text style={styles.bulletText}>Great job!!!</Text>
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
