import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as firebase from 'firebase';

import { AuthService } from './../services/auth'; 

export default class LoginScreen extends React.Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {email:'', password:'', error:'', loading: false};
    this.authService = new AuthService();
  }

  onLoginPress() {
    this.setState({error:'', loading: true});

    this.authService.signin({email: this.state.email, password: this.state.password})
    .subscribe(res => {
        if (res) {
            this.setState({error:'', loading:false});
            this.props.navigation.navigate('App');
        } else {
            this.setState({error:'Authentification failed', loading:false});
        }
    });
  }

  checkCredentials() {
        if (this.state.email == '') {
            this.setState({error:'Email is not set', loading:false});
            return false;
        }

        if (this.state.password == '') {
            this.setState({error:'Password is not set', loading:false});
            return false;
        }
        return true;
  }

  navigateToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text>Loading...</Text>
        } else {
            return (
                <View>
                    <Button
                    onPress={this.onLoginPress.bind(this)}
                    title='Login'></Button>
                </View>
            )
        }
  }

  render() {
    return (
        <View>
            <Input
            placeholder='Email'
            onChangeText={email => this.state.email = email}
            />
            <Input
            secureTextEntry
            placeholder='Password'
            onChangeText={password => this.state.password = password}
            />
            <Text>{this.state.error}</Text>
            {this.renderButtonOrLoading()}
            <Button
            onPress={this.navigateToSignUp.bind(this)}
            title="You haven't an account ?"
            ></Button>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
