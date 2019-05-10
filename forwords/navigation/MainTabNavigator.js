import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

// Main Tabs
import HomeScreen from "../screens/Launch/HomeScreen";
import UserProfileScreen from "../screens/Launch/UserProfileScreen";

// Rest of the Screens
import GamePlayScreen from "../screens/GamePlay/GamePlayScreen";
import JoinOrCreateScreen from "../screens/GameSetUp/Multiplayer/JoinOrCreateScreen";
import GameSetUpScreen from "../screens/GameSetUp/GameSetUpScreen";
import InstructionsScreen from "../screens/GamePlay/Instructions/InstructionsScreen";
import LobbyScreen from "../screens/GameSetUp/Multiplayer/LobbyScreen";
import GameOverScreen from "../screens/GamePlay/GameOverScreen";
import AddCourseScreen from "../screens/Launch/AddCourse/AddCourseScreen";
import RoleSelectionScreen from "../screens/Launch/AddCourse/RoleSelectionScreen";
import CourseInfoScreen from "../screens/Launch/AddCourse/CourseInfoScreen";

// Main Tabs
// Profile Tab
const UserProfileStack = createStackNavigator({
  UserProfile: UserProfileScreen,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-home" : "md-home"}
    />
  )
};

// Create Tab Navigator
const TabNavigator = createBottomTabNavigator(
  {    
    HomeStack,
    UserProfileStack,
  },
  {
    tabBarOptions: {
      activeTintColor: "#5b3b89",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  var headerTitle;
  switch(routeName) {
    case("HomeStack"):
      headerTitle = "Home";
      break;
    case("UserProfileStack"):
      headerTitle = "Profile";
      break;
    default:
    headerTitle = routeName
  }
  
  return {
    headerTitle,
  };
};

// Whatever is with the Tabs here will not have tabs on their screen:
export default createStackNavigator({
  Tabs: TabNavigator,
  JoinOrCreate: JoinOrCreateScreen,
  GameSetUp: GameSetUpScreen,
  Lobby: LobbyScreen,
  Instructions: InstructionsScreen,
  GamePlay: GamePlayScreen,
  GameOver: GameOverScreen,
  RoleSelection: RoleSelectionScreen,
  AddCourse: AddCourseScreen,
  UserProfile: UserProfileScreen,
  CourseInfo: CourseInfoScreen,
});
