import axios from "axios";
import React, { Component } from "React";
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    KeyboardAvoidingView
} from "react-native";
import * as firebase from "firebase";

var backwordsIP = "172.27.43.141";

export default class RegisterScreen extends Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: ""
        };
    }

    registerStudent = () => {
        if (this.state.password !== this.state.confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                () => { },
                error => {
                    Alert.alert(error.message);
                }
            );
    };

    registerTeacher = () => {
        if (this.state.password !== this.state.confirmPassword) {
            Alert.alert("Passwords do not match");
            return;
        }
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(
                () => { },
                error => {
                    Alert.alert(error.message);
                }
            );
    };

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView style={styles.container} behavior="position">
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
                    <Text>Register as...</Text>
                    <View style={styles.buttonsContainer}>
                        <Button
                            onPress={() => this.registerStudent()}
                            style={styles.button}
                            title="Student"
                            color='purple'
                        />
                        <Button
                            onPress={() => this.registerTeacher()}
                            style={styles.button}
                            title="Teacher"
                            color='purple'
                        />
                    </View>
                    <Button onPress={() => navigate("Login")}
                        style={styles.button} title="Cancel"
                        color='black' />
                </View>
            </KeyboardAvoidingView>
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
