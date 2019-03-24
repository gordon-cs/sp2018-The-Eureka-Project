import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Launch/HomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import JoinOrCreateScreen from '../screens/GameSetUp/Multiplayer/JoinOrCreateScreen';
import GameSetUpScreen from '../screens/GameSetUp/GameSetUpScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import InstructionsScreen from '../screens/GamePlay/Instructions/InstructionsScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import LobbyScreen from '../screens/GameSetUp/Multiplayer/LobbyScreen';

import SinglePlayerModeSelectionScreen from '../screens/Selection/SinglePlayerModeSelectionScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

const ForgotPasswordStack = createStackNavigator({
  ForgotPassword: ForgotPasswordScreen,
});

const RegisterStack = createStackNavigator({
  Register: RegisterScreen,
});

const JoinOrCreateStack = createStackNavigator({
  JoinOrCreate: JoinOrCreateScreen,
});

const GameSetUpStack = createStackNavigator({
  GameSetUp: GameSetUpScreen,
});

const LobbyStack = createStackNavigator({
  Lobby: LobbyScreen,
}); 

const SinglePlayerModeSelectionStack = createStackNavigator({
  SinglePlayerModeSelection: SinglePlayerModeSelectionScreen,
});

const GamePlayStack = createStackNavigator({
  GamePlay: GamePlayScreen,
});

const InstructionsStack = createStackNavigator({
  Instructions: InstructionsScreen,
});

export default createStackNavigator({
  LoginStack,
  HomeStack,
  JoinOrCreateStack,
  RegisterStack,
  ForgotPasswordStack,

  GamePlayStack,
  GameSetUpStack,
  InstructionsStack,
  LobbyStack,

  SinglePlayerModeSelectionStack,
});
