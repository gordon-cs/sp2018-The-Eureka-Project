import React, { Component } from "react";
import { Button, StyleSheet,Text, TextInput, View,} from "react-native";

export default class JoinScreen extends Component {
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
        var ws = this.props.navigation.state.params.ws;
        var newMessage = 'join' + this.state.groupCode;
        ws.send( newMessage );
        ws.onmessage = e => {
        console.log('Received message:', e.data)
        }
        //if (e.data != '' || e.data != '0') { caused error
            navigate("Ready", { groupID: this.state.groupCode, ws: ws })
        //}
        //else {
        // print error on screen
        //}
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <View style={styles.headingView}>
            <Text style={styles.mainText}>
              Enter an existing group code:
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
            title='Join!'
            onPress={() => this.joinOnPress()}
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
