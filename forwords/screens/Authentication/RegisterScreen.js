import axios from "axios";
import React, { Component } from "React";
import {
  Button,
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <KeyboardAvoidingView>
            <View style={styles.headingView}>
              <Text style={styles.headingText}>Register!</Text>
            </View>
            <TextInput
              onChangeText={firstName => this.setState({ firstName })}
              placeholder="First Name"
              returnKeyType="next"
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TextInput
              onChangeText={lastName => this.setState({ lastName })}
              placeholder="Last Name"
              returnKeyType="next"
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TextInput
              onChangeText={email => this.setState({ email })}
              placeholder="Email"
              returnKeyType="next"
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TextInput
              onChangeText={username => this.setState({ username })}
              placeholder="Username"
              returnKeyType="next"
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TextInput
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              returnKeyType="next"
              secureTextEntry={true}
              placeholderTextColor="black"
              style={styles.textInput}
            />
            <TextInput
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
              placeholder="Confirm Password"
              secureTextEntry={true}
              placeholderTextColor="black"
              style={styles.textInput}
            />
          </KeyboardAvoidingView>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigate("Login")}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.register()}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "#5b3b89"
  },
  cancelButton: {
    justifyContent: "center",
    flexDirection: "column",
    margin: 10,
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: "gray"
  },
  buttonText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "white"
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
  container: {
    flex: 10,
    backgroundColor: "#fff",
    padding: 10
  },
  contentContainer: {
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 50
  },
  buttonsContainer: {
    justifyContent: "center",
    flexDirection: "row"
  },
  headingView: {
    alignItems: "center"
  },
  headingText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
    margin: 10
  }
});
