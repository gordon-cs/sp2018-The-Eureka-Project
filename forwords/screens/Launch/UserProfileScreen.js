import React, { Component } from "react";
import user from "../../services/user";
import firebase from "firebase";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";
import MyCourses from "./components/MyCourses";
import forwordsStyles from "../../constants/forwordsStyles";

export default class UserProfileScreen extends Component {
  static navigationOptions = {
    title: "Profile"
  };

  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      courseInfo: [],
      isMyProfile: false
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    let userInfo = await user.getUserInfo(email); // full name
    this.setState({ isLoading: false, userInfo });

    if (email === firebase.auth().currentUser.email) {
      this.setState({ isMyProfile: true });
    }
  }

  onSignOutPress = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signOut();
    navigate("Login");
  };

  render() {
    const email = firebase.auth().currentUser.email;
    const { userInfo, isMyProfile } = this.state;
    const { navigate } = this.props.navigation;

    if (isMyProfile) {
      return (
        <View style={forwordsStyles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={forwordsStyles.specialContainer}
          >
            <View style={forwordsStyles.headingView}>
              <Image
                style={forwordsStyles.playerImage}
                source={require("../../assets/images/person.png")}
              />
              <Text style={forwordsStyles.headingText}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </View>
            <Text style={forwordsStyles.mainText}>email: {email}</Text>
            <Text style={forwordsStyles.mainText}>
              username: {userInfo.username}
            </Text>
            <MyCourses navigation={this.props.navigation} />
            <View style={forwordsStyles.headingView}>
              <TouchableOpacity
                style={forwordsStyles.addCourseNarrowLongButton}
                onPress={() => navigate("RoleSelection")}
              >
                <Text style={forwordsStyles.buttonText}>{"Add a course"}</Text>
              </TouchableOpacity>
            </View>
            <View style={forwordsStyles.headingView}>
              <Text style={forwordsStyles.headingText}>Recent Activity</Text>
              <Text style={forwordsStyles.mainText}>
                This will show game scores soon...:')
              </Text>
            </View>
            <View style={forwordsStyles.headingView}>
              <TouchableOpacity
                style={forwordsStyles.signOutNarrowLongButton}
                onPress={() => this.onSignOutPress()}
              >
                <Text style={forwordsStyles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    } else {
      return (
        <View style={forwordsStyles.container}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={forwordsStyles.container}
            contentContainerStyle={forwordsStyles.contentContainer}
          >
            <Image
              style={forwordsStyles.playerImage}
              source={require("../../assets/images/person.png")}
            />
            <View style={forwordsStyles.headingView}>
              <Text style={forwordsStyles.headingText}>
                {userInfo.firstName} {userInfo.lastName}
              </Text>
            </View>
            <Text style={forwordsStyles.mainText}>
              username: {userInfo.username}
            </Text>
          </ScrollView>
        </View>
      );
    }
  }
}
