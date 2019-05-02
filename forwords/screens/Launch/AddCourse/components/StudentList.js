import React, { Component } from "react";
import * as firebase from "firebase";
import student from "../../../../services/student";
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
    let students = await student.getStudents(email, courseID);
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
        if (students.length > 0) {
          return (
            <View>
              <Text style={forwordsStyles.mainText}>Students in this class:</Text>
              {studentList}
            </View>
          );
        } else {
          return (
            <View>
              <Text style={forwordsStyles.mainText}>There are no students in this class yet. They can join by entering the Class Code!</Text>
            </View>
          );          
        }
    } else {
      return null;
    }
  }
}
