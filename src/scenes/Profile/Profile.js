// @flow
import React from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import * as firebase from 'firebase';
import { setUsername } from '../../redux/Profile/actions';

type Props = {
  navigation: any,
  setUsername: string,
};

type State = {
  text:string,
};

class Profile extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { text: 'Username' };
  }

  logout = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => {
            this.props.setUsername({text})
            this.setState({text})
          }}
          value={this.state.text}
        />
        <Button onPress={this.logout} title="logout" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Profile;