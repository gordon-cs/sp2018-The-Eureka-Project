import React, { Component } from "react";
import * as firebase from "firebase";
import course from "../../../services/course";
import { TouchableOpacity, Text, View, ActivityIndicator, } from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class coursesITeach extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      coursesITeach: [],
      coursesITake: [], 
      isLoading: true,
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    let coursesITeach = await course.getMyCourses(email, "teacher");
    let coursesITake = await course.getMyCourses(email, "student");
    this.setState({ coursesITeach, coursesITake, isLoading: false });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { coursesITeach, coursesITake, isLoading } = this.state;
    let listOfCoursesITeach, listOfCoursesITake;
    if (isLoading) {
      listOfCoursesITake = (
        <View>
          <ActivityIndicator/>
        </View>
      );
      listOfCoursesITeach = (
        <View>
          <ActivityIndicator/>
        </View>
      );
    }
    if (coursesITeach.length > 0) {
      listOfCoursesITeach = coursesITeach.map(course => (
        <TouchableOpacity
          key={course.courseID}
          style={forwordsStyles.narrowLongButton}
          onPress={() =>
            navigate("CourseInfo", {
              courseID: course.courseID,
              courseTitle: course.title
            })
          }
        >
          <Text style={forwordsStyles.buttonText}>{course.title}</Text>
        </TouchableOpacity>
      ));
    }
    if (coursesITake.length > 0) {
      listOfCoursesITake = coursesITake.map(course => (
        <TouchableOpacity
          key={course.courseID}
          style={forwordsStyles.narrowLongButton}
          onPress={() =>
            navigate("CourseInfo", {
              courseID: course.courseID,
              courseTitle: course.title
            })
          }
        >
          <Text style={forwordsStyles.buttonText}>{course.title}</Text>
        </TouchableOpacity>
      ));
    }
    return (
      <View styles={forwordsStyles.specialContainer}>
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>My Courses</Text>
        </View>
        <Text style={forwordsStyles.headingText}>Courses I Teach</Text>
        <View style={forwordsStyles.headingView}>{listOfCoursesITeach}</View>
        <Text style={forwordsStyles.headingText}>Courses I Am Enrolled In</Text>
        <View style={forwordsStyles.headingView}>{listOfCoursesITake}</View>
      </View>
    );
  }
}
