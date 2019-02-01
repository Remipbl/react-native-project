// @flow
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  navigation: any,
};

type State = {
  
};

class HomePage extends React.Component<Props, State> {

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
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

export default HomePage;