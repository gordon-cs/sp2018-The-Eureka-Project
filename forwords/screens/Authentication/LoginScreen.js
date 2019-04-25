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
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          navigate("Home");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={-25}
      >
        <View style={styles.getStartedContainer}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/forwordsFullLogo.png")}
          />
          <TextInput
            onChangeText={email => this.setState({ email })}
            autoCorrect={false}
            placeholder="Email"
            autoCapitalize="none"
            returnKeyType="done"
            placeholderTextColor="black"
            style={styles.textInput}
          />

          <TextInput
            onChangeText={password => this.setState({ password })}
            autoCorrect={false}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType="done"
            placeholderTextColor="black"
            style={styles.textInput}
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigate("Register")}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => this.onLoginPress()}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <Button
            style={styles.button}
            title="I forgot my password."
            onPress={() => navigate("ForgotPassword")}
            color="purple"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  buttonsContainer: {
    justifyContent: "center",
    flexDirection: "row"
  },
  loginButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#5b3b89"
  },
  registerButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "black"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
  },
  logo: {
    height: 60,
    width: 280,
    resizeMode: "contain",
    margin: 20,
  },
  contentContainer: {
    paddingTop: 30
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 150
  },
  textInput: {
    height: 60,
    width: 280,
    borderColor: "#5b3b89",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 4
  },
  button: {
    alignItems: "center",
    color: "#5b3b89",
    borderRadius: 50,
    width: 160
  },
  forwordsText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#5b3b89",
    marginVertical: 10,
    fontSize: 30
  }
});
