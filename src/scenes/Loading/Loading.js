import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import auth from '../../config/api/services/auth';

class Loading extends React.Component {

  constructor(props) {
    super(props);
    // this.authService = new AuthService();
    this.bootstrapAsync();
  }

  bootstrapAsync() {
    auth.getUserInformations().subscribe(user => {
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

export default Loading;