import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import ForgotPasswordScreen from "../screens/Authentication/ForgotPasswordScreen";

const AuthenticationNavigator = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen,
  Register: RegisterScreen
});

export default createStackNavigator({
  AuthenticationNavigator
});
