import React, { Component } from "react";
import * as firebase from "firebase";
import course from "../../../services/course";
import { TouchableOpacity, Text, View, } from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class MyCourses extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      myCourses: []
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    let myCourses = await course.getMyCourses(email);
    this.setState({ myCourses });
  }

  render() {
    const { navigate } = this.props.navigation;
    let myCourses;
    if (this.state.myCourses.length > 0) {
      myCourses = this.state.myCourses.map(course => (
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
      <View>
        <View style={forwordsStyles.headingView}>
          <Text style={forwordsStyles.headingText}>My Courses</Text>
        </View>
        {myCourses}
      </View>
    );
  }
}
