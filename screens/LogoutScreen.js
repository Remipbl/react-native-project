import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    firebase.auth().signOut();
  }

  render() {
    return (
        <View>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
