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

/* Total Explanation for the stacks/switches/etc
 * A. Home Tab:
 * should get to both multiplayer and singleplayer mode
 * both multiplayer & singleplayer mode should get to gamesetup
 * both should get to instructions/gameplay/gameover
 * One Big SwitchNavigator(
 * 1.1. GamePlaySwitch
 * InstructionsScreen
 * GamePlayScreen
 * GameOverScreen
 * 1.2. GamePlaySetUpStack   ---> COMBINE BOTH SINGLE AND MULTIPLAYER
 * JoinOrCreateScreen
 * GameSetUpScreen
 * LobbyScreen
 * GamePlaySwitch
 * 1.3 SinglePlayerSetUpStack
 * GameSetUpScreen
 * GamePlaySwitch
 * )
 *
 * 2. Profile Tab:
 * should get to profile screen
 * should be able to add a course for teacher or student
 *
 * 2.1. UserProfileStack
 * UserProfileScreen
 * RoleSelectionScreen
 * AddCourseScreen
 * CourseInfoScreen
 */

// Main Tabs
// Profile Tab
const UserProfileStack = createStackNavigator({
  UserProfile: UserProfileScreen,
  RoleSelection: RoleSelectionScreen,
  AddCourse: AddCourseScreen,
  UserProfile: UserProfileScreen,
  CourseInfo: CourseInfoScreen
});

UserProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-link" : "md-link"}
    />
  )
};

// Home Tab
const GamePlaySwitch = createSwitchNavigator({
  Instructions: InstructionsScreen,
  GamePlay: GamePlayScreen,
  GameOver: GameOverScreen
});

const MultiplayerGamePlaySetUpStack = createStackNavigator({
  JoinOrCreate: JoinOrCreateScreen,
  GameSetUp: GameSetUpScreen,
  Lobby: LobbyScreen,
});

const MultiplayerSwitch = createSwitchNavigator({
  MultiplayerGamePlaySetUp: MultiplayerGamePlaySetUpStack,
  GamePlay: GamePlaySwitch,
});

const SinglePlayerSwitch = createSwitchNavigator({
  SingleGameSetUp: GameSetUpScreen,
  GamePlay: GamePlaySwitch,
});

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Login: LoginScreen
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

// Create Tab Navigator
const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Profile: UserProfileStack
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
export default createSwitchNavigator({
  Tabs: TabNavigator,
  Multiplayer: MultiplayerSwitch,
  SinglePlayer: SinglePlayerSwitch,
});
