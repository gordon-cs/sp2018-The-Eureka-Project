import axios from "axios";
import React, { Component } from "React";
import { Button, StyleSheet, Text, TextInput, View, Alert, KeyboardAvoidingView, } from "react-native";
import firebase from "firebase";
import { httpsRoute } from '../../constants/API';

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
            confirmPassword: "",
        };
    }

    login() {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => {
            let user = { 
                email:  firebase.auth().currentUser.email,
                username: this.state.username,
                lastName: this.state.lastName,
                firstName: this.state.firstName,
                targetLanguage: "Chinese"
            }
            this.addUser(user);
          }, (error) => {
            Alert.alert(error.message);
          });
      }

  // parameter user: an object from firebase that we will use to fill in sql table,
  // then navigate to Login Screen
  async addUser(user) {
    const { navigate } = this.props.navigation;
    axios.post(`${httpsRoute}/add-user`, user)
      .then(function (res) {
        console.log("/add-user worked")
        navigate('Home');   
      })
      .catch(function (err) {
        console.log('/add-user failed')
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
    };

    render() {
        const { navigate } = this.props.navigation;
        return (            
            // <KeyboardAvoidingView style={styles.container} behavior="position">
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Register!</Text>
                    <TextInput
                        onChangeText={firstName => this.setState({ firstName })}
                        placeholder="First Name"
                        returnKeyType="next"
                        style={{ height: 60, width: 200 }}
                    />
                    <TextInput
                        onChangeText={lastName => this.setState({ lastName })}
                        placeholder="Last Name"
                        returnKeyType="next"
                        style={{ height: 60, width: 200 }}
                    />
                    <TextInput
                        onChangeText={email => this.setState({ email })}
                        placeholder="Email"
                        returnKeyType="next"
                        style={{ height: 60, width: 200 }}
                    />
                    <TextInput
                        onChangeText={username => this.setState({ username })}
                        placeholder="Username"
                        returnKeyType="next"
                        style={{ height: 60, width: 200 }}
                    />
                    <TextInput
                        onChangeText={password => this.setState({ password })}
                        placeholder="Password"
                        returnKeyType="next"
                        secureTextEntry={true}
                        style={{ height: 60, width: 200 }}
                    />
                    <TextInput
                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        style={{ height: 60, width: 200 }}
                    />
                    <View style={styles.buttonsContainer}>
                        <Button 
                            onPress={() => navigate("Login")}
                            style={styles.button} title="Cancel"
                            color='black' />
                        <Button
                            onPress={() => this.register()}
                            style={styles.button}
                            title="Register"
                            color='purple'
                        />
                    </View>
                </View>
            // </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        color: '#800080',
        borderRadius: 50,
        width: 160,
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 30
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
    title: {
        alignItems: "center",
        justifyContent: "center",
        color: "#800080",
        marginVertical: 10,
        fontSize: 30
    },
    buttonsContainer: {
        justifyContent: "center",
        flexDirection: "row"
    }
});
