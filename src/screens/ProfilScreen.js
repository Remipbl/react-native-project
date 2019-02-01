import React from 'react';
import { ActivityIndicator, StyleSheet, Button } from 'react-native';
import * as firebase from 'firebase';

export default class ProfilScreen extends React.Component {

  logout() {
    firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return <Button onPress={this.logout} title="logout" />;
  }

}

const styles = StyleSheet.create({
  indicator: {
    marginTop: 100,
  },
});
