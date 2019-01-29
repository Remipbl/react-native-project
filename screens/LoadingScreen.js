import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
  } from 'react-native';
import * as firebase from 'firebase';

export default class LoadingScreen extends React.Component {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'App' : 'Auth');
        });
  }

  render() {
    return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
