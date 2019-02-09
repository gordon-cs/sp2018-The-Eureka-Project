import React, { Component } from "react";
import axios from "axios";
import {
  AppRegistry,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Platform,
  ScrollView
} from "react-native";

import { fullRoutePrefix } from "../../constants/API";
const ws = new WebSocket('ws://172.27.43.141:4000');


export default class JoinMultiplayerScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      groupCode: '',
    };
  }
  joinOnPress() {
    const { navigate } = this.props.navigation;
    // var people = [];
    // people.push('Hello');
    // var groups = new Map();
    // groups.set(this.state.groupCode, people);
    // groups.get(this.state.groupCode).push('Oi M8!')
    // console.log('Map Worked:', groups.get(this.state.groupCode))
    ws.send( this.state.groupCode )
    ws.onmessage = e => {
      console.log('Received message:', e.data) // print on client screen ideally
    }
}
createOnPress() {
  const { navigate } = this.props.navigation;
  ws.send('create')
  ws.onmessage = e => {
    console.log('Received message:', e.data) // print on client screen ideally
  }
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingView}>
            <Text style={styles.mainText}>
              Enter an existing group code and join, or create your own group!
            </Text>
          </View>
          <TextInput
            style={{ height: 60, width: 150 }}
            alignItems='center'
            placeholder="Group Code"
            onChangeText={(groupCode) => this.setState({ groupCode })}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
          console.log()
          <Button style={styles.button}
            title='Join Game!'
            onPress={() => this.joinOnPress()}
            color='purple'
          />
          <Button style={styles.button}
            title='Create Game!'
            onPress={() => this.createOnPress()} // Ideally this will also lead to this player going to a wait screen.
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
  mainText: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    fontSize: 20,
    color: 'black',
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
