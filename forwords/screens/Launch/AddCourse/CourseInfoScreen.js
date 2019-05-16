import React, { Component } from "react";
import course from "../../../services/course";
import firebase from "firebase";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert
} from "react-native";
import StudentList from "./components/StudentList";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class CourseInfoScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    if (navigation.getParam("role", "student") == "teacher") {
      title = "Create a Course";
    } else {
      title = "Add a Course";
    }
    return {
      title: navigation.getParam("courseTitle", "Course Info")
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      recentGames: [],
      role: ""
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    const courseID = this.props.navigation.state.params.courseID;
    let role = await course.getCourseRole(email, courseID);
    this.setState({ isLoading: false, role });
  }

  render() {
    const { navigate } = this.props.navigation;
    const courseID = this.props.navigation.state.params.courseID;
    const courseTitle = this.props.navigation.state.params.courseTitle;
    const email = firebase.auth().currentUser.email;
    const { isLoading, recentGames, role } = this.state;

    let deleteButton;
    if (role === "teacher") {
      deleteButton = (
        <TouchableOpacity
          style={forwordsStyles.deleteNarrowLongButton}
          onPress={() =>
            Alert.alert(
              "Are You Sure?",
              `Are you sure you want to delete the (${courseID}) ${courseTitle} Course? ` +
                "This action cannot be undone!",
              [
                {
                  text: "Yes, delete this course.",
                  onPress: () => {
                    course.deleteCourse(email, courseID).then(() => {
                      navigate("UserProfile", { email: email });
                    });
                  }
                },
                { text: "No" }
              ]
            )
          }
        >
          <Text style={forwordsStyles.buttonText}>Delete Course</Text>
        </TouchableOpacity>
      );
    } else {
      deleteButton = (
        <TouchableOpacity
          style={forwordsStyles.deleteNarrowLongButton}
          onPress={() =>
            Alert.alert(
              "Are You Sure?",
              `Are you sure you want to leave the (${courseID}) ${courseTitle} Course? ` +
                "This action cannot be undone!",
              [
                {
                  text: "Yes, remove me from this course.",
                  onPress: () => {
                    course.removeStudentFromCourse(email, courseID).then(() => {
                      navigate("UserProfile", { email: email });
                    });
                  }
                },
                { text: "No" }
              ]
            )
          }
        >
          <Text style={forwordsStyles.buttonText}>Unenroll From Course</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={forwordsStyles.flexContentContainer}
        >
            <Text style={forwordsStyles.headingText}>
              Course Code: ({courseID})
            </Text>
          <Text style={forwordsStyles.mainText}>
            Recent Activity from groups in this course:
          </Text>
          <StudentList
            navigation={this.props.navigation}
            role={role}
            courseID={courseID}
          />
          <View style={forwordsStyles.headingView}>{deleteButton}</View>
        </ScrollView>
      </View>
    );
  }
}
