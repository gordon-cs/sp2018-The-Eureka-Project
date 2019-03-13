import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import SelectMultiplayerScreen from '../screens/Multiplayer/SelectMultiplayerScreen';
import MultiplayerSetUpScreen from '../screens/Multiplayer/MultiplayerSetUpScreen';
import SinglePlayerModeSelectionScreen from '../screens/Selection/SinglePlayerModeSelectionScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import InstructionScreen from '../screens/GamePlay/Instructions/InstructionScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import WaitingRoomScreen from '../screens/Multiplayer/WaitingRoomScreen';

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

const SelectMultiplayerStack = createStackNavigator({
  SelectMultiplayer: SelectMultiplayerScreen,
});

const MultiplayerSetUpStack = createStackNavigator({
  MultiplayerSetUp: MultiplayerSetUpScreen,
});

const WaitingRoomStack = createStackNavigator({
  WaitingRoom: WaitingRoomScreen,
}); 

const GamePlayScreenStack = createStackNavigator({
  GamePlay: GamePlayScreen,
});

const InstructionStack = createStackNavigator({
  Instruction: InstructionScreen,
});

export default createStackNavigator({
  HomeStack,
  SelectMultiplayerStack,
  MultiplayerSetUpStack,
  LoginStack,
  RegisterStack,
  ForgotPasswordStack,
  SinglePlayerModeSelectionStack,
  GamePlayScreenStack,
  InstructionStack,
  WaitingRoomStack,
});
