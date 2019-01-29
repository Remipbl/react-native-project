import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import { Input } from 'react-native-elements';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {username:'' ,email:'', password:'', error:'', loading: false};
  }

  onLoginPress() {
    this.setState({error:'', loading: true});

    const {email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        this.setState({error:'', loading:false});
        this.props.navigation.navigate('App');
    })
    .catch(() => {
        this.setState({error:'Authentification failed', loading:false});
    })
  }

  onSignUpPress() {
    this.setState({error:'', loading: true});
    if (this.checkCredentials()) {
        const {email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            firebase.database().ref('/users/'+res.user.uid+'/').set({
                id: res.user.uid,
                username: this.state.username,
                email: this.state.email
            })
            .then(res2 => {
                this.setState({loading:false});
                this.props.navigation.navigate('App');
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(() => {
            this.setState({error:'Authentification failed', loading:false});
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

  renderButtonOrLoading() {
        console.log(this.state.loading);
        if (this.state.loading) {
            return <Text>Loading...</Text>
        } else {
            return (
                <View>
                    <Button
                    onPress={this.onLoginPress.bind(this)}
                    title='Login'></Button>
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
        </View>
    );
  }

}

const styles = StyleSheet.create({
  
});
