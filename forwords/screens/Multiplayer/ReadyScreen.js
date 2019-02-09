import React, { Component } from "react";
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
    this.state = {};
  }
    readyOnPress() {
        const { navigate } = this.props.navigation;
        ws.send('ready');
        ws.onmessage = e => {
            console.log('Received message:', e.data) // print on client screen ideally
        }
    }
    showData() {
        var groupID = this.props.navigation.state.params.groupID;
    }
    async componentWillMount() {
        try {
            this.showData();
        } catch (error) {
            throw new Error('component will not mount');
        }
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.headingView}>
          <Text style={styles.mainText}>
              Your group code is {groupID}
            </Text>
            <Text style={styles.mainText}>
              Press the button when you're ready to play!
            </Text>
          </View>
          <Button style={styles.button}
            title='Ready!'
            onPress={() => this.readyOnPress()}
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
