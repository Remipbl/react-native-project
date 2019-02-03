// @flow
import { createAppContainer, createStackNavigator } from 'react-navigation';
import * as Pages from './scenes';

export const RootNavigator = createStackNavigator({
  homePage: {
    screen: Pages.HomePage,
  },
  categories: {
    screen: Pages.Categories,
  },
  initialRouteName: 'homePage',
});

const AppContainer = createAppContainer(RootNavigator);

export default AppContainer;
