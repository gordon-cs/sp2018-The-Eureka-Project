import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import SinglePlayerModeSelectionScreen from '../screens/SinglePlayerModeSelectionScreen';
import RegisterScreen from '../screens/RegisterScreen';
import InstructionScreen from '../screens/InstructionScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

const PlaceholderStack = createStackNavigator({
  Placeholder: PlaceholderScreen,
});

const ForgotPasswordStack = createStackNavigator({
  ForgotPassword: ForgotPasswordScreen,
});

const RegisterStack = createStackNavigator({
  Register: RegisterScreen,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

const SinglePlayerModeSelectionStack = createStackNavigator({
  SinglePlayerModeSelection: SinglePlayerModeSelectionScreen,
});

const GamePlayScreenStack = createStackNavigator({
  GamePlay: GamePlayScreen,
});

const InstructionStack = createStackNavigator({
  Instruction: InstructionScreen,
});

export default createStackNavigator({
  LoginStack,
  RegisterStack,
  HomeStack,
  ForgotPasswordStack,
  PlaceholderStack,
  SettingsStack,
  SinglePlayerModeSelectionStack,
  GamePlayScreenStack,
  InstructionStack,
});
