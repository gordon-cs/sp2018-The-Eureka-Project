import React, { Component } from "react";
import course from "../../../services/course";
import student from "../../../services/student";
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
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      recentGames: [],
      students: [],
      role: ""
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    const courseID = this.props.navigation.state.params.courseID;
    let role = await course.getCourseRole(email, courseID);
    let students = await student.getStudents(email, courseID);
    this.setState({ isLoading: false, role, students });
  }

  render() {
    const { navigate } = this.props.navigation;
    const courseID = this.props.navigation.state.params.courseID;
    const courseTitle = this.props.navigation.state.params.courseTitle;
    const email = firebase.auth().currentUser.email;
    const { isLoading, recentGames, role } = this.state;

    let deleteButton, studentList;
    if (role === "teacher") {
      studentList = (
        <StudentList
        navigation={this.props.navigation}
        role={role}
        courseID={courseID}
      />
      );
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
                  text: "Yes",
                  onPress: () => {
                    course.deleteCourse(email, courseID).then(() => {
                      navigate("Home");
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
      deleteButton = null;
    }


    return (
      <View style={forwordsStyles.container}>
        <ScrollView>
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>
              ({courseID}) {courseTitle} Course
            </Text>
          </View>
          <Text style={forwordsStyles.mainText}>
            Recent Activity from groups in this class:
          </Text>
          {studentList}
          {deleteButton}
        </ScrollView>
      </View>
    );
  }
}

