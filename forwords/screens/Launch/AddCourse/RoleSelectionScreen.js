import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class RoleSelectionScreen extends Component {
  static navigationOptions = {
    title: 'Create or Join a Course'
  };
  constructor(props) {
    super(props);

    this.state = {
      role: ""
    };
  }

  teacherAddCourse() {
    const { navigate } = this.props.navigation;
    navigate("AddCourse", { role: "teacher" });
  }

  studentAddCourse() {
    const { navigate } = this.props.navigation;
    navigate("AddCourse", { role: "student" });
  }

  render() {
    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.flexContentContainer}
        >
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>
              Which best describes the kind of course you want to add?
            </Text>
          </View>
          <TouchableOpacity
            style={forwordsStyles.longButton}
            onPress={() => this.teacherAddCourse()}
          >
            <Text style={forwordsStyles.buttonText}>
              I am a teacher creating a course.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={forwordsStyles.longButton}
            onPress={() => this.studentAddCourse()}
          >
            <Text style={forwordsStyles.buttonText}>
              I am a student joining a course.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
