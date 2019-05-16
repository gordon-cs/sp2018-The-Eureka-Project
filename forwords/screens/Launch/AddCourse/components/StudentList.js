import React, { Component } from "react";
import * as firebase from "firebase";
import user from "../../../../services/user";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import forwordsStyles from "../../../../constants/forwordsStyles";

export default class StudentList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      students: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    const courseID = this.props.navigation.state.params.courseID;
    let students = await user.getStudents(email, courseID);
    this.setState({ isLoading: false, students });
  }

  render() {
    const { navigate, role } = this.props;
    const { students, isLoading } = this.state;
    let studentList;
    if (isLoading && role === 'teacher') {
      return (
        <View>
          <ActivityIndicator/>
        </View>
      );
    }
    else if (!isLoading && role === "teacher") {
      studentList = students.map(student => (
        <View
          key={student.userID}
          style={forwordsStyles.moreNarrowLongButton}
        >
          <Text style={forwordsStyles.buttonText}>
            {student.firstName + " " + student.lastName}
          </Text>
        </View>
        ));
        if (students.length > 0) {
          return (
            <View>
              <Text style={forwordsStyles.mainText}>Students in this course:</Text>
              {studentList}
            </View>
          );
        } else {
          return (
            <View>
              <Text style={forwordsStyles.mainText}>There are no students in this course yet. They can join by entering the course code!</Text>
            </View>
          );          
        }
    } else {
      return null;
    }
  }
}
