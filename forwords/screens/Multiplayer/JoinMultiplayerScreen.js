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
// const Spidersocket = require('ws');
const ws = new WebSocket('ws://http://172.27.43.141:4000');


export default class JoinMultiplayerScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

  }
  joinOnPress() {
    const { navigate } = this.props.navigation;
    window.onload = () => {
    // ws.on('open', function open() {
    //  ws.send('hi');
    // });
      ws.onopen = () => {
        console.log('Connection Established! :)')
        ws.send('Hi!')
      }
    }
  // ws.on('message', function incoming(data) {
  //   console.log(data);
  // });

//   connection.onmessage = e => {
//     console.log('Received message:', e.data)
//     document.getElementById('messages').innerHTML += (e.data + '<br/>')
//     input.disabled = false
//   }
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
            onPress={() => this.joinOnPress()}
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
