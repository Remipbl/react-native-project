import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { LoginComponent } from './../components/AppComponents';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
        <View style={{paddingTop:20}}>
            <Text>Hello</Text>
            <LoginComponent />
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
