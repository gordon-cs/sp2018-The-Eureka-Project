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

import LoginScreen from "../screens/Authentication/LoginScreen";

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
  RoleSelection: RoleSelectionScreen,
  AddCourse: AddCourseScreen,
  UserProfile: UserProfileScreen,
  CourseInfo: CourseInfoScreen,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-link"}
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
      name={Platform.OS === "ios" ? "ios-options" : "md-link"}

    />
  )
};

// Create Tab Navigator
const TabNavigator = createBottomTabNavigator(
  {    
    Home: HomeScreen,
    Profile: UserProfileStack,
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
          iconName = `ios-home`;
        }
        else {

        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={"#5b3b89"} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "#5b3b89",
      inactiveTintColor: "gray"
    }
  }
);

// Whatever is with the Tabs here will not have tabs on their screen:
export default createStackNavigator({
  Tabs: TabNavigator,
  JoinOrCreate: JoinOrCreateScreen,
  GameSetUp: GameSetUpScreen,
  Lobby: LobbyScreen,
  Instructions: InstructionsScreen,
  GamePlay: GamePlayScreen,
  GameOver: GameOverScreen,
});
