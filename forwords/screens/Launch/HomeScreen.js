import React from "react";
import * as firebase from "firebase";
import course from '../../services/course';
import {
  Button,
  ScrollView,
  TouchableOpacity,
  View,
  Image,
  Text
} from "react-native";
import forwordsStyles from "../../constants/forwordsStyles";

export default class HomeScreen extends React.Component {
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
    var email = firebase.auth().currentUser.email;
    let myCourses = await course.getMyCourses(email);
    this.setState({ myCourses });
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
    if (this.state.myCourses.length > 0) {
      var myCourses = this.state.myCourses.map(course => (
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
    } else {
    }

    return (
      <View style={forwordsStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={forwordsStyles.headingView}>
            <Text style={forwordsStyles.headingText}>My Courses</Text>
          </View>
          {myCourses}
          <TouchableOpacity
            style={forwordsStyles.addCourseNarrowLongButton}
            onPress={() => navigate("RoleSelection")}
          >
            <Text style={forwordsStyles.buttonText}>{"Add a course"}</Text>
          </TouchableOpacity>
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