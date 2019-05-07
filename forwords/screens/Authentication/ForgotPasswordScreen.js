import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity
} from "react-native";
import forwordsStyles from '../../constants/forwordsStyles';
import * as firebase from "firebase";

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        error => {
          Alert.alert(error.message);
        }
      );
  };

  render() {
    const { navigate } = this.props.navigation;
    var email = this.props.navigation.state.params.email;
    return (
      <View style={styles.container}>
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>Reset Password</Text>
        </View>
        <TextInput
          onChangeText={email => {
            this.setState({ email });
          }}
          autoCorrect={false}
          placeholder={email}
          autoCapitalize="none"
          returnKeyType="done"
          keyboardType="email-address"
          placeholderTextColor="black"
          style={forwordsStyles.textInput}
        />
        <View style={forwordsStyles.rowButtonsContainer}>
          <TouchableOpacity
            style={forwordsStyles.secondaryButton}
            onPress={() => navigate("Login")}
          >
            <Text style={forwordsStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={forwordsStyles.primaryButton}
            onPress={() => this.onResetPasswordPress()}
          >
            <Text style={forwordsStyles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
});
