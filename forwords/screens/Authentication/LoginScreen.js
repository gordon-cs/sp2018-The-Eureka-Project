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
import forwordsStyles from '../../constants/forwordsStyles';
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
            onPress={() => navigate("ForgotPassword", { email: this.state.email })}
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
  contentContainer: {
    paddingTop: 30
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 150
  },
});
