import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationNavigator from './AuthenticationNavigator';
import GamePlayNavigator from './GamePlayNavigator';

// Use a switch navigator for the tabs so that you cannot hit the backbutton on screens to move between tabs.
export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html

  // Put all stacks in here
  Authentication: AuthenticationNavigator,
  // This is the BottomTabNavigator, which has stacks inside of it.
  Main: MainTabNavigator,
  // This is for game play, which would mean you don't want there to be any back button actions allowed.
  // GamePlay: GamePlayNavigator,
});