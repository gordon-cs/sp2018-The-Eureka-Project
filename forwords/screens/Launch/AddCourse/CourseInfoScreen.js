import React, { Component } from "react";
import student from '../../../services/student';
import course from '../../../services/course';
import firebase from "firebase";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import forwordsStyles from "../../../constants/forwordsStyles";

export default class AddCourse extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      isLoading: true,
      recentGames: []
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    const courseID = this.props.navigation.state.params.courseID;
    let students = await student.getStudents(email, courseID);
    this.setState({ isLoading: false, students });
  }

  render() {
    const { navigate } = this.props.navigation;
    const courseID = this.props.navigation.state.params.courseID;
    const courseTitle = this.props.navigation.state.params.courseTitle;
    const email = firebase.auth().currentUser.email;
    let studentsList;
    if (!this.state.isLoading && this.state.students.length > 0) {
      <Text style={forwordsStyles.mainText}>Students in this class:</Text>;
      studentsList = this.state.students.map(student => (
        <TouchableOpacity
          key={student.userID}
          style={forwordsStyles.moreNarrowLongButton}
          onPress={() => navigate("Home")}
        >
          <Text style={forwordsStyles.buttonText}>
            {student.firstName + " " + student.lastName}
          </Text>
        </TouchableOpacity>
      ));
    } else if (!this.state.isLoading && this.state.students.length === 0) {
      studentsList = (
        <Text style={forwordsStyles.mainText}>
          Students in this class: There are no students in this course.
        </Text>
      );
    } else if (!this.state.isLoading && this.state.students == "403") {
      studentslist = null;
    } else {
      studentsList = <ActivityIndicator />;
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
          {studentsList}
          <TouchableOpacity
            style={forwordsStyles.deleteNarrowLongButton}
            onPress={() => 
              Alert.alert('Are You Sure?', 
                          `Are you sure you want to delete the (${courseID}) ${courseTitle} Course? ` +
                          'This action cannot be undone!', 
                          [{ text: 'Yes', onPress: () => {
                            course.deleteCourse(email, courseID).then(() => {
                              this.refresh();
                            });
                          } }, { text: 'No' }])
            }
          >
            <Text style={forwordsStyles.buttonText}>Delete Course</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
