import React from "react";
import axios from "axios";
import * as firebase from "firebase";
import { httpsRoute } from "../../constants/API";
import {
  Button,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Text
} from "react-native";
import forwordsStyles from '../../constants/forwordsStyles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      courses: []
    };
  }

  async componentWillMount() {
    var email = firebase.auth().currentUser.email;
    try {
      axios.get(`${httpsRoute}/my-courses/${email}`).then(res => {
        const courses = res.data;
        this.setState({
          courses: courses
        });
      });
    } catch (err) {
      throw new Error("my-courses did not work");
    }
  }

  onSignOutPress = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signOut();
    navigate("Login");
  };

  // User wants to play solo
  onPressSinglePlayerMode = () => {
    const { navigate } = this.props.navigation;
    const playerType = "solo";
    navigate("GameSetUp", { playerType: playerType });
  };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.courses.length > 0) {
      var courses = this.state.courses.map(course => (
        <Button
          key={course.courseID}
          color="#5b3b89"
          title={course.title}
          onPress={() => navigate("Register")}
        />
      ));
    } else {
      var courses = (
        <Button
          color="#5b3b89"
          title={"Add a course"}
          onPress={() => navigate("AddCourse")}
        />
      );
    }

    return (
      <View style={forwordsStyles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>My Courses</Text>
          </View>
          {courses}
          <View style={forwordsStyles.headingView}>
            <TouchableOpacity
              style={forwordsStyles.headingView}
              onPress={() => navigate("JoinOrCreate")}
            >
              <Text style={forwordsStyles.headingText}>Multiplayer Mode</Text>
              <Image
                style={{ width: 200, height: 200 }}
                source={require("../../assets/images/people.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={forwordsStyles.headingView}>
            <TouchableOpacity
              style={forwordsStyles.headingView}
              onPress={() => this.onPressSinglePlayerMode()}
            >
              <Text style={forwordsStyles.headingText}>Single Player Mode</Text>
              <Image
                style={{ width: 200, height: 200 }}
                source={require("../../assets/images/person.png")}
              />
            </TouchableOpacity>
          </View>
          <Button
            style={forwordsStyles.textButton}
            title="Sign Out"
            onPress={() => this.onSignOutPress()}
            color="purple"
          />
        </ScrollView>
      </View>
    );
  }
}