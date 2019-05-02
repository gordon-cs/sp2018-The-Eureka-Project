import { createStackNavigator, createDrawerNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
//import colors from './utils/colors';
import HomeScreen from '../screens/Launch/HomeScreen';
import LoginScreen from '../screens/Authentication/LoginScreen';
import GamePlayScreen from '../screens/GamePlay/GamePlayScreen';
import JoinOrCreateScreen from '../screens/GameSetUp/Multiplayer/JoinOrCreateScreen';
import GameSetUpScreen from '../screens/GameSetUp/GameSetUpScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import InstructionsScreen from '../screens/GamePlay/Instructions/InstructionsScreen';
import ForgotPasswordScreen from '../screens/Authentication/ForgotPasswordScreen';
import LobbyScreen from '../screens/GameSetUp/Multiplayer/LobbyScreen';
import GameOverScreen from "../screens/GamePlay/GameOverScreen";

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

const GamePlayStack = createStackNavigator({
  GamePlay: GamePlayScreen,
});

const GameOverStack = createStackNavigator({
  GameOver: GameOverScreen,
});

const InstructionsStack = createStackNavigator({
  Instructions: InstructionsScreen,
});

const HomeDrawerStack = createDrawerNavigator({
  Home: HomeScreen,
})

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
//   HomeDrawer: HomeDrawerStack,
// });

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen,
});

// const SingleGamingStack = createStackNavigator({
//   GameSetUp: GameSetUpScreen,
//   Instructions: InstructionsScreen,
//   GamePlay: GamePlayScreen,
//   GameOver: GameOverScreen,
// });

// const MultiGamingStack = createStackNavigator({
//   JoinOrCreate: JoinOrCreateScreen,
//   GameSetUp: GameSetUpScreen,
//   Lobby: LobbyScreen,
//   Instructions: InstructionsScreen,
//   GamePlay: GamePlayScreen,
//   GameOver: GameOverScreen,
// });

const MultiGamingStack = createSwitchNavigator(
  {
  JoinOrCreate: {
    screen: JoinOrCreateStack,
  },
  GameSetUp: {
    screen: GameSetUpStack,
  },
  Lobby: {
    screen: LobbyStack,
  },
  Instruction: {
    screen: InstructionsStack,
  },
  Gameplay: {
    screen: GamePlayStack,
  },
  GameOver: {
    screen: GameOverStack,
    },
  },
  {
  initialRouteName: 'JoinOrCreate',
  },
  );

  const SingleGamingStack = createSwitchNavigator(
    {
    GameSetUp: {
      screen: GameSetUpStack,
    },
    Instruction: {
      screen: InstructionsStack,
    },
    Gameplay: {
      screen: GamePlayStack,
    },
    GameOver: {
      screen: GameOverStack,
      },
    },
    {
    initialRouteName: 'GameSetUp',
    },
  );

    const HomeStack = createSwitchNavigator(
      {
      Home: {
        screen: HomeScreen,
      },
      MGame: {
        screen: MultiGamingStack,
      },
      SGame: {
        screen: SingleGamingStack,
      },
      // JoinOrCreate: {
      //   screen: JoinOrCreateStack,
      // },
      // GameSetUp: {
      //   screen: GameSetUpStack,
      // },
      // Lobby: {
      //   screen: LobbyStack,
      // },
      // Instruction: {
      //   screen: InstructionsStack,
      // },
      // Gameplay: {
      //   screen: GamePlayStack,
      // },
      // GameOver: {
      //   screen: GameOverStack,
      //   },
    },
    {
      initialRouteName: 'Home',
      // NavigationOptions: {
      //   tabBarIcon: getTabBarIcon('person')
      // },
    },

      //HomeDrawer: HomeDrawerStack,
  );
  const MainAppNavigation = createBottomTabNavigator(
    {
    Home: {
    screen: HomeScreen,
    },
    // Auth: {
    //   screen: AuthStack,
    // },
    },
    {
      initialRouteName: 'Home',
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'grey',
        labelStyle: {
          fontSize: 12,
        },
        style: {
          backgroundColor: 'purple',
        },
      },
      showLabel: false,
      showIcon: true,
      renderIndicator: () => null,
    },
  );


export default createSwitchNavigator({
    Auth: AuthStack,
    Home: MainAppNavigation,
    SGame: SingleGamingStack,
    MGame: MultiGamingStack,
});

// export default createSwitchNavigator({
//   LoginStack,
//   HomeDrawerStack,
//   JoinOrCreateStack,
//   RegisterStack,
//   ForgotPasswordStack,
//   GamePlayStack,
//   GameSetUpStack,
//   GameOverStack,
//   InstructionsStack,
//   LobbyStack,
// });
