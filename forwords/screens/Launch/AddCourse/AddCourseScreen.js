import React, { Component } from "react";
import axios from "axios";
import {
  Text,
  View,
  TextInput,
  Picker,
  TouchableOpacity,
  Alert
} from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";
import firebase from "firebase";
import { httpsRoute } from "../../../constants/API";

export default class AddCourseScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      courseCode: "",
      courseTitle: "",
      targetLanguage: "Chinese",
      chosenIndex: ""
    };
  }

  // parameter courseCode: text input from the user about which course to add
  // then navigate back to the Home Screen
  async addCourseOnPress() {
    const { navigate } = this.props.navigation;
    const email = firebase.auth().currentUser.email;
    if (this.state.courseCode === "") {
      Alert.alert("The Course Code field is required.");
    } else {
      axios
        .post(`${httpsRoute}/add-course`, {
          courseCode: this.state.courseCode,
          email: email
        })
        .then(res => {
          if (res.data.errno == 1062) {
            Alert.alert(
              `You are already enrolled as a student in the course with code '${this.state.courseCode}'.`
            );
          } else {
            navigate("UserProfile", { email: email, refresh: 'heyo'});
          }
        });
    }
  }

  // parameter courseCode: text input from the user about which course to add
  // then navigate back to the Home Screen
  async createCourseOnPress() {
    const { navigate } = this.props.navigation;
    const email = firebase.auth().currentUser.email;
    if (this.state.courseTitle === "") {
      Alert.alert("The Course Title field is required.");
    } else {
      axios
        .post(`${httpsRoute}/create-course`, {
          title: this.state.courseTitle,
          langauge: this.state.targetLanguage,
          email: email
        })
        .then(res => {
          if (res.data.errno === 1048) {
            Alert.alert("The title cannot be left blank.");
          } else {
            navigate("UserProfile", { email: email, refresh: 'whddup' });
          }
        });
    }
  }

  render() {
    const role = this.props.navigation.state.params.role; // host, member, or solo

    if (role === "student") {
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
            keyboardType="number-pad"
            onSubmitEditing={() => this.addCourseOnPress()}
          />
          <TouchableOpacity
            style={forwordsStyles.primaryButton}
            onPress={() => this.addCourseOnPress()}
          >
            <Text style={forwordsStyles.buttonText}>Add Course</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (role === "teacher") {
      return (
        <View style={forwordsStyles.container}>
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>Create a Course</Text>
          </View>
          <Text style={forwordsStyles.mainText}>
            Enter the details of the course you are creating.
          </Text>

          <TextInput
            style={forwordsStyles.textInput}
            alignItems="center"
            placeholder="Course Title"
            onChangeText={courseTitle => this.setState({ courseTitle })}
            autoCorrect={true}
            placeholderTextColor="black"
            returnKeyType="done"
            keyboardType="default"
          />

          <Text style={forwordsStyles.mainText}>
            Select the target language of this course:
          </Text>
          <View style={{ flex: 1 }}>
            <Picker
              selectedValue={this.state.targetLanguage}
              style={forwordsStyles.picker}
              itemStyle={forwordsStyles.mainText}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({
                  targetLanguage: itemValue,
                  choosenIndex: itemIndex
                })
              }
            >
              <Picker.Item key={"es"} label={"Spanish"} value={"Spanish"} />
              <Picker.Item key={"en"} label={"English"} value={"English"} />
              <Picker.Item key={"zh"} label={"Chinese"} value={"Chinese"} />
            </Picker>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              style={forwordsStyles.primaryButton}
              onPress={() => this.createCourseOnPress()}
            >
              <Text style={forwordsStyles.buttonText}>Create Course</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
