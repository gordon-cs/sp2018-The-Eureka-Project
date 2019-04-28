import axios from "axios";
import React, { Component } from "React";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";
import firebase from "firebase";
import forwordsStyles from "../../constants/forwordsStyles";
import { httpsRoute } from "../../constants/API";

export default class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
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
  }

  // parameter user: an object from firebase that we will use to fill in sql table,
  // then navigate to Login Screen
  async addUser() {
    if (this.state.firstName === "") {
      Alert.alert("The First Name field is required.");
    } else if (this.state.lastName === "") {
      Alert.alert("The Last Name field is required.");
    } else if (this.state.email === "") {
      Alert.alert("The Email field is required.");
    } else if (this.state.username === "") {
      Alert.alert("The Username field is required.");
    } else if (this.state.password !== this.state.confirmPassword) {
      Alert.alert("Passwords do not match");
    } else {
      let user = {
        email: this.state.email,
        username: this.state.username,
        lastName: this.state.lastName,
        firstName: this.state.firstName
      };
      axios.post(`${httpsRoute}/add-user`, user).then(res => {
        if (res.data.errno === 1062) {
          if (res.data.sqlMessage.includes("email")) {
            Alert.alert(
              "Sorry, that email has already been registered to an account. Please choose another one."
            );
          } else if (res.data.sqlMessage.includes("username")) {
            Alert.alert(
              "Sorry, that username has already been taken. Please choose another one."
            );
          }
        } else if (res.data.errno === 1048) {
          Alert.alert("No field can be left blank.");
        } else {
          this.register();
        }
      });
    }
  }

  register() {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.login();
        },
        error => {
          Alert.alert(error.message);
        }
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={forwordsStyles.container}
        keyboardShouldPersistTaps="always"
      >
        <KeyboardAvoidingView behavior="padding">
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>Register!</Text>
          </View>
          <TextInput
            onChangeText={firstName => this.setState({ firstName })}
            placeholder="First Name"
            returnKeyType="next"
            placeholderTextColor="black"
            textContentType="givenName"
            style={forwordsStyles.textInput}
          />
          <TextInput
            onChangeText={lastName => this.setState({ lastName })}
            placeholder="Last Name"
            returnKeyType="next"
            placeholderTextColor="black"
            textContentType="familyName"
            style={forwordsStyles.textInput}
          />
          <TextInput
            onChangeText={email => this.setState({ email })}
            placeholder="Email"
            returnKeyType="next"
            placeholderTextColor="black"
            textContentType="emailAddress"
            keyboardType="email-address"
            style={forwordsStyles.textInput}
          />
          <TextInput
            onChangeText={username => this.setState({ username })}
            placeholder="Username"
            returnKeyType="next"
            placeholderTextColor="black"
            textContentType="username"
            style={forwordsStyles.textInput}
          />
          <TextInput
            onChangeText={password => this.setState({ password })}
            placeholder="Password"
            returnKeyType="next"
            secureTextEntry={true}
            placeholderTextColor="black"
            style={forwordsStyles.textInput}
          />
          <TextInput
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            placeholder="Confirm Password"
            secureTextEntry={true}
            placeholderTextColor="black"
            style={forwordsStyles.textInput}
          />
        </KeyboardAvoidingView>

        <View style={forwordsStyles.rowButtonsContainer}>
          <TouchableOpacity
            style={forwordsStyles.secondaryButton}
            onPress={() => navigate("Login")}
          >
            <Text style={forwordsStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={forwordsStyles.primaryButton}
            onPress={() => this.addUser()}
          >
            <Text style={forwordsStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
