import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
import * as firebase from 'firebase';

import { AuthService } from './../services/auth';

export default class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this._bootstrapAsync();
  }

  _bootstrapAsync() {
    this.authService.getUserInformations().subscribe(user => {
      this.props.navigation.navigate(user ? 'App' : 'Auth');
    });
  }

  render() {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop:60
  }
});
