import React, { Component } from "react";
import axios from "axios";
import {
  AppRegistry,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  ScrollView
} from "react-native";
import { fullRoutePrefix } from "../../constants/API";

const url = 'ws://' + (location.hostname || 'localhost') + ':8080';
const connection = new WebSocket(url);

// var input;
var backwordsIP = "172.27.43.141";

export default class JoinMultiplayerScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

  }
  joinOnPress() {

window.onload = () => {
  connection.send(true)


  connection.onerror = error => {
    console.log(`WebSocket error: ${error}`)
  }

  connection.onopen = () => {
    console.log('Connection Established! :)))))')
  }

//   connection.onmessage = e => {
//     console.log('Received message:', e.data)
//     document.getElementById('messages').innerHTML += (e.data + '<br/>')
//     input.disabled = false
//   }
}
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingView}>
            <Text style={styles.icon}>
              👤
          </Text>
          </View>
          <Button style={styles.button}
            title='Join Game!'
            onPress={() => joinOnPress()}
            color='purple'
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    paddingTop: Platform.OS === "ios" ? 20 : 0
  },
  button: {},
  headingText: {
    fontWeight: "bold",
    fontSize: 30
  },
  headingView: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  icon: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    fontSize: 80
  }
});
