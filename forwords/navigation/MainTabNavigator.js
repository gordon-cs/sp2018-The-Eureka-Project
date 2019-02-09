import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import JoinMultiplayerScreen from '../screens/Multiplayer/JoinMultiplayerScreen';
import ReadyScreen from '../screens/Multiplayer/ReadyScreen';
import SinglePlayerModeSelectionScreen from '../screens/Selection/SinglePlayerModeSelectionScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import InstructionScreen from '../screens/GamePlay/Instructions/InstructionScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';

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

const SinglePlayerModeSelectionStack = createStackNavigator({
  SinglePlayerModeSelection: SinglePlayerModeSelectionScreen,
});

const JoinMultiplayerStack = createStackNavigator({
  JoinMultiplayer: JoinMultiplayerScreen,
});

const ReadyStack = createStackNavigator({
  Ready: ReadyScreen,
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
  SinglePlayerModeSelectionStack,
  JoinMultiplayerStack,
  ReadyStack,
  GamePlayScreenStack,
  InstructionStack,
});
