import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";

// Main Tabs
import HomeScreen from "../screens/Launch/HomeScreen";
import UserProfileScreen from "../screens/Launch/UserProfileScreen";

// Screens for tabs' stacks:
/*
 * Home:
 * GamePlaySetUpStack
 * GamePlaySwitch
 * GameOverSwitch
 *
 *
 * Profile:
 * AddCoursesStack
 * CourseInfoStack
 */

// import HomeScreen from '../screens/Launch/HomeScreen';
// import LoginScreen from '../screens/Authentication/LoginScreen';
// import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
// import JoinOrCreateScreen from '../screens/GameSetUp/Multiplayer/JoinOrCreateScreen';
// import GameSetUpScreen from '../screens/GameSetUp/GameSetUpScreen';
// import RegisterScreen from '../screens/Authentication/RegisterScreen';
// import InstructionsScreen from '../screens/GamePlay/Instructions/InstructionsScreen';
// import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
// import LobbyScreen from '../screens/GameSetUp/Multiplayer/LobbyScreen';
// import GameOverScreen from "../screens/GamePlay/GameOverScreen";
import AddCourseScreen from "../screens/Launch/AddCourse/AddCourseScreen";
import RoleSelectionScreen from "../screens/Launch/AddCourse/RoleSelectionScreen";
import CourseInfoScreen from "../screens/Launch/AddCourse/CourseInfoScreen";

// Main Tabs
// Home Tab
const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};
// Profile Tab
const ProfileStack = createStackNavigator({
  UserProfile: UserProfileScreen
});

ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

// Game Play Stack Navigator

// Game Play Switch Navigator
import GamePlayScreen from "../screens/GamePlay/GamePlayScreen";

const GamePlayNavigator = createSwitchNavigator({
  GamePlay: GamePlayScreen
});




// Adding/Creating Courses Stack
const CourseStack = createStackNavigator(
  {
    RoleSelection: RoleSelectionScreen,
    AddCourse: AddCourseScreen,
    UserProfile: UserProfileScreen,
    CourseInfo: CourseInfoScreen
  },
  {
    initialRouteName: "UserProfile"
  }
);

// Create Tab Navigator
export default createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: CourseStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-information-circle${focused ? "" : "-outline"}`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = HomeIconWithBadge;
        } else if (routeName === "Profile") {
          iconName = `ios-options`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={'#5b3b89'} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#5b3b89",
      inactiveTintColor: "gray"
    }
  }
);
