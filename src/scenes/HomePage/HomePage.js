// @flow
import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

type Props = {
  navigation: any,
};

type State = {
  
};

class HomePage extends React.Component<Props, State> {
  goToProfil = () => {
    this.props.navigation.navigate('profil');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello</Text>
        <Button onPress={this.goToProfil} title="to profil"/>
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