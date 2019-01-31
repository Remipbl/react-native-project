import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

import { AuthService } from '../services/auth';

export default class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.bootstrapAsync();
  }

  bootstrapAsync() {
    this.authService.getUserInformations().subscribe(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return <ActivityIndicator style={styles.indicator} />;
  }

}

const styles = StyleSheet.create({
  indicator: {
    marginTop: 100,
  },
});
