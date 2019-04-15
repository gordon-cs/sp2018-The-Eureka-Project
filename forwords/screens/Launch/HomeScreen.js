import React from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }
  onSignOutPress = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signOut();
    navigate("Login");
  };

// User wants to play solo
  onPressSinglePlayerMode = () => {
    const { navigate } = this.props.navigation;
    const playerType = 'solo';
    navigate("GameSetUp", { playerType: playerType});
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
        >
        <View style={styles.headingView}>
          <TouchableOpacity
          style={styles.imageContainer}
            onPress={() => navigate("JoinOrCreate")}
          >
          <Text style={styles.headingText}>Multiplayer Mode</Text>
            <Image
              style={{ width: 200, height: 200 }}
              source={require("../../assets/images/people.png")}
            />
          </TouchableOpacity>
        </View>
          <View style={styles.headingView}>
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => this.onPressSinglePlayerMode()}
            >
            <Text style={styles.headingText}>Single Player Mode</Text>
              <Image
                style={{ width: 200, height: 200 }}
                source={require("../../assets/images/person.png")}
              />
            </TouchableOpacity>
          </View>
          <Button
            style={styles.button}
            title="Sign Out"
            onPress={() => this.onSignOutPress()}
            color="purple"
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
  },
  headingView: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  contentContainer: {
    paddingTop: 30
  },
  button: {
    alignItems: "center",
    color: "#800080",
    borderRadius: 50,
    width: 160,
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: 'black',
    margin: 10,
  },
});
