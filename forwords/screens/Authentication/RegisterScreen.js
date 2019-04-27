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
  }

  login() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          let user = {
            email: firebase.auth().currentUser.email,
            username: this.state.username,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            targetLanguage: "Chinese"
          };
          this.addUser(user);
        },
        error => {
          Alert.alert(error.message);
        }
      );
  }

  // parameter user: an object from firebase that we will use to fill in sql table,
  // then navigate to Login Screen
  async addUser(user) {
    const { navigate } = this.props.navigation;
    axios
      .post(`${httpsRoute}/add-user`, user)
      .then(function(res) {
        console.log("/add-user worked");
        navigate("Home");
      })
      .catch(function(err) {
        console.log("/add-user failed");
      });
  }

  register() {
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
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
        keyboardShouldPersistTaps='always'
      >
        <KeyboardAvoidingView
          behavior="padding"
        >
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
            onPress={() => this.register()}
          >
            <Text style={forwordsStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
