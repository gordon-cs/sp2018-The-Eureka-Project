import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import SinglePlayerModeSelectionScreen from '../screens/Selection/SinglePlayerModeSelectionScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import InstructionScreen from '../screens/GamePlay/Instructions/InstructionScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';

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
  SinglePlayerModeSelectionStack,
  LoginStack,
  RegisterStack,
  HomeStack,
  ForgotPasswordStack,
  PlaceholderStack,
  SinglePlayerModeSelectionStack,
  GamePlayScreenStack,
  InstructionStack,
});
