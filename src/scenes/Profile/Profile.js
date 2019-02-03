// @flow
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  navigation: any,
};

type State = {
  
};

class Profile extends React.Component<Props, State> {

  

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#897890',
  },
});

export default Profile;