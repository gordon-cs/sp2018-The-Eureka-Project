import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import forwordsStyles from '../../constants/forwordsStyles';

export default class AddCourse extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
        courseCode: '',
    };
  }
  // parameter courseCode: text input from the user about which course to add
  // then navigate back to the Home Screen
  async addCourseOnPress(courseCode) {
    const { navigate } = this.props.navigation;
    axios
      .post(`${httpsRoute}/add-course`, user)
      .then(function(res) {
        console.log("/add-course worked");
        navigate("Home");
      })
      .catch(function(err) {
        console.log("/add-course failed");
      });
  }

  render() {
    return (
      <View style={forwordsStyles.container}>
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>Add a Course</Text>
        </View>
        <Text style={forwordsStyles.mainText}>
          Enter the course code given by your instructor.
        </Text>
        <TextInput
          style={forwordsStyles.textInput}
          alignItems="center"
          placeholder="Course Code"
          onChangeText={courseCode => this.setState({ courseCode })}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="black"
          returnKeyType="done"
          keyboardType="default"
        />
        <TouchableOpacity
          style={forwordsStyles.primaryButton}
          onPress={() => this.addCourseOnPress()}
        >
          <Text style={forwordsStyles.buttonText}>Add Course</Text>
        </TouchableOpacity>
      </View>
    );
  }
}