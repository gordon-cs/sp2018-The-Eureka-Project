import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import SinglePlayerModeSelectionScreen from '../screens/Selection/SinglePlayerModeSelectionScreen';
import JoinMultiplayerScreen from '..screens/Multiplayer/JoinMultiplayerScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InstructionScreen from '../screens/Instruction/InstructionScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';



const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-login'}
    />
  ),
};

const PlaceholderStack = createStackNavigator({
  Placeholder: PlaceholderScreen,
});


const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const RegisterStack = createStackNavigator({
  Register: RegisterScreen,
});

RegisterStack.navigationOptions = {
  tabBarLabel: 'Register',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};


const SinglePlayerModeSelectionStack = createStackNavigator({
  SinglePlayerModeSelection: SinglePlayerModeSelectionScreen,
});

const JoinMultiplayerStack = createStackNavigator({
  JoinMultiplayer: JoinMultiplayerScreen,
});

const GamePlayScreenStack = createStackNavigator({
  GamePlay: GamePlayScreen,
});

const InstructionStack = createStackNavigator({
  Instruction: InstructionScreen,
});

export default createStackNavigator({
  LoginStack,
  HomeStack,
  PlaceholderStack,
  LinksStack,
  RegisterStack,
  SettingsStack,
  SinglePlayerModeSelectionStack,
  JoinMultiplayerStack,
  GamePlayScreenStack,
  InstructionStack
});
