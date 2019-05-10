import React from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import forwordsStyles from "../../constants/forwordsStyles";
import * as firebase from "firebase";

export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Reset Password'
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
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.flexContentContainer}
        >
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.mainText}>
              Enter the email to your account and you will receive a link to
              reset your password.
            </Text>
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
        </ScrollView>
      </View>
    );
  }
}
