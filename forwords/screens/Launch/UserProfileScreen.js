import React, { Component } from "react";
import user from "../../services/user";
import firebase from "firebase";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import MyCourses from "./components/MyCourses";
import forwordsStyles from "../../constants/forwordsStyles";

export default class UserProfileScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      courseInfo: [],
      isMyProfile: false,
      recentGames: []
    };
  }

  async componentDidMount() {
    const email = firebase.auth().currentUser.email;
    // const { email } = this.props.navigation.setParam({email: firebase.auth().currentUser.email});

    // const { email } = this.props.navigation.getParam('email', 't@y.com')
    let userInfo = await user.getUserInfo(email);
    let recentGames = await user.getMyRecentGames(email);
    this.setState({ isLoading: false, userInfo, recentGames });

    if (email === firebase.auth().currentUser.email) {
      this.setState({ isMyProfile: true });
    }
  }

  onSignOutPress = () => {
    const { navigate } = this.props.navigation;
    firebase.auth().signOut();
    navigate("Authentication");
  };

  render() {
    const { userInfo, isMyProfile, recentGames } = this.state;
    const { navigate } = this.props.navigation;
    let recentGamesList;
    if (recentGames.length > 0) {
      recentGamesList = recentGames.map(game => (
        <View
          key={game.gameID}
          style={forwordsStyles.recentGameLongButton}
        >
          <Text style={forwordsStyles.buttonText}>
            GameID: {game.gameID}         Score: {game.score}
          </Text>
        </View>
      ));
    }

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
              <Text style={forwordsStyles.headingText}>Recent Activity</Text>
              {recentGamesList}
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
