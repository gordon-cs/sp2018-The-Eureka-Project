/**
 * File: HelloWorldDemo
 * Author(s): Ezekiel Martinez and Jake Moon
 * Description: forwords React Native UI Demo
 * @format
 * @flow
 */

 /* General Developement Instructions:
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
*/
    import React, {Component} from 'react';
    import { Alert, AppRegistry, Button, Content, Header, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
    
    export default class App extends Component {
      _onPressButton() {
        Alert.alert('Hello World!');
      }
      render() {
        return (
          <View style={styles.container}>
          <View style={styles.button}>
          <Button
            onPress={this._onPressButton}
            title="forwords!"
            color='white'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: 'purple',
    borderRadius: 50,
  },
});
