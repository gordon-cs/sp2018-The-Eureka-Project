import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPasswordScreen";

const AuthenticationStack = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen
});

// You could add another route here for authentication.
// Read more at https://reactnavigation.org/docs/en/auth-flow.html

// This is the BottomTabNavigator, which has stacks inside of it.
// Put all stacks in here
export default createSwitchNavigator(
  {
    Authentication: AuthenticationStack,
    Main: MainTabNavigator
  }
);
