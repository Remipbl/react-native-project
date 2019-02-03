// @flow
import { createAppContainer, createStackNavigator } from 'react-navigation';
import * as Pages from './scenes';

export const RootNavigator = createStackNavigator({
  homePage: {
    screen: Pages.HomePage,
  },
  profile: {
    screen: Pages.Profile,
  },
  initialRouteName: 'homepage',
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
