import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  Alert,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'; // There are some unecessary imports, but they were made just to be safe
import * as firebase from 'firebase';


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      email: '',
      password: '',
    };
  }

  onLoginPress = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        navigate('Home');
      }, (error) => {
        Alert.alert(error.message);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position" keyboardVerticalOffset={-25}>
        <View style={styles.getStartedContainer}>
          <Text style={styles.forwordsText}>
            forwords!
            </Text>
          <TextInput
            style={{ height: 60, width: 200 }}
            placeholder="Email"
            onChangeText={(email) => this.setState({ email })}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
          />
          <TextInput
            style={{ height: 60, width: 200 }}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType="done"
          />
          <Button style={styles.button}
            title='Log In'
            onPress={() => this.onLoginPress()}
            color='purple'
          />
          <Button style={styles.button}
            title='New User? Register here!'
            onPress={() => navigate('Register')}
            color='purple'
          />
          {/* <Button style={styles.button}
              title = 'CLICK FOR DEVELOPING BABY'
              onPress = {() => navigate('GamePlay')}
              color = 'red'
            /> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#fff',
    padding: 10,
  },  
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginVertical: 150,
  },
  button: {
    alignItems: 'center',
    color: '#800080',
    borderRadius: 50,
    width: 160,
  },
  forwordsText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#800080',
    marginVertical: 10,
    fontSize: 30,
  }
});