// @flow
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import * as Pages from './scenes';

export const RootNavigator = createStackNavigator({
  homePage: {
    screen: Pages.HomePage,
  },
  categories: {
    screen: Pages.Categories,
  },
  profile: {
    screen: Pages.Profile,
  },
  initialRouteName: 'homepage',
});

export const AuthNavigator = createStackNavigator({
  login: {
    screen: Pages.Login,
  },
  register: {
    screen: Pages.Register,
  },
  initialRouteName: 'login',
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: Pages.Loading,
      Auth: AuthNavigator,
      App: RootNavigator,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);

export default AppContainer;
