import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as firebase from 'firebase';

import { AuthService } from './../services/auth'; 

export default class SignUpScreen extends React.Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {username:'' ,email:'', password:'', error:'', loading: false};
    this.authService = new AuthService();
  }

  onSignUpPress() {
    this.setState({error:'', loading: true});
    if (this.checkCredentials()) {
        this.authService.signup({email: this.state.email, password: this.state.password, username: this.state.username})
        .subscribe(res => {
            if (res) {
                this.setState({loading:false});
                this.props.navigation.navigate('App');
            } else {
                this.setState({error:'Authentification failed', loading:false});
            }
        });
    }
  }

  checkCredentials() {
        if (this.state.username == '') {
            this.setState({error:'Username is not set', loading:false});
            return false;
        }

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

  navigateToSignIn() {
      this.props.navigation.navigate('Auth');
  }

  renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text>Loading...</Text>
        } else {
            return (
                <View>
                    <Button
                    onPress={this.onSignUpPress.bind(this)}
                    title='Sign Up'></Button>
                </View>
            )
        }
  }

  render() {
    return (
        <View>
            <Input
            placeholder='Username'
            onChangeText={username => this.state.username = username}
            />
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
            onPress={this.navigateToSignIn.bind(this)}
            title="You have an account ?"
            ></Button>
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
