import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Alert,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text
} from "react-native";
import { StackActions, NavigationActions } from 'react-navigation';
import forwordsStyles from "../../constants/forwordsStyles";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      email: "",
      password: ""
    };
  }

  onLoginPress = () => {
    const { navigate } = this.props.navigation;
    // const resetAction = StackActions.reset({
    //   index: 0, // <-- currect active route from actions array
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Home' }),
    //   ],
    // });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.navigation.navigate("Home");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView behavior="padding" style={forwordsStyles.container}>
          <Image
            style={forwordsStyles.logo}
            source={require("../../assets/images/forwordsFullLogo.png")}
          />
          <TextInput
            onChangeText={email => this.setState({ email })}
            autoCorrect={false}
            placeholder="Email"
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="email-address"
            placeholderTextColor="black"
            style={forwordsStyles.textInput}
          />

          <TextInput
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType="done"
            placeholderTextColor="black"
            style={forwordsStyles.textInput}
          />

          <View style={forwordsStyles.rowButtonsContainer}>
            <TouchableOpacity
              style={forwordsStyles.secondaryButton}
              onPress={() => navigate("Register")}
            >
              <Text style={forwordsStyles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={forwordsStyles.primaryButton}
              onPress={() => this.onLoginPress()}
            >
              <Text style={forwordsStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Button
            style={forwordsStyles.textButton}
            title="I forgot my password."
            onPress={() =>
              navigate("ForgotPassword", { email: this.state.email })
            }
            color="purple"
          />
      </KeyboardAvoidingView>
    );
  }
}
