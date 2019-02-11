import React, { Component } from "react";
import { Button, StyleSheet,Text, TextInput, View,} from "react-native";
const ws = new WebSocket('ws://172.27.43.141:4000');

// JoinMultiplayerScreen.js 
// Author: Ezekiel Martinez
// This screen allows a user to be able to create a new group
// or join an existing group by entering a code. This accomplished
// by sending specific messages to the backend via ws.

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
    ws.send( 'join' + this.state.groupCode )
    ws.onmessage = e => {
      console.log('Received message:', e.data)
    }
    navigate("Ready", { groupID: this.state.groupCode, ws: ws })
}
createOnPress() {
  const { navigate } = this.props.navigation;
  ws.send('create')
  ws.onmessage = e => {
    console.log('Received message:', e.data)
    navigate("Ready", { groupID: e.data, ws: ws })
  }
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <View style={styles.headingView}>
            <Text style={styles.mainText}>
              Enter an existing group code and join, or create your own group!
            </Text>
          </View>
          <TextInput
            style={{ height: 60, width: 300 }}
            alignItems='center'
            placeholder="Group Code"
            onChangeText={(groupCode) => this.setState({ groupCode })}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
          />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 10,
    backgroundColor: '#fff',
    padding: 10,
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
