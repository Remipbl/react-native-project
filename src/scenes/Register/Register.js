import React from 'react';
import { StyleSheet, Text, Button, View, TextInput, Image, KeyboardAvoidingView } from 'react-native';
import * as firebase from 'firebase';
import { Formik } from 'formik';

import auth from '../../config/api/services/auth'; 

class Register extends React.Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {username:'' ,email:'', password:'', error:'', loading: false};
  }

  onSignUpPress() {
    this.setState({error:'', loading: true});
    if (this.checkCredentials()) {
        auth.signup({email: this.state.email, password: this.state.password, username: this.state.username})
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

  navigateToSignIn = () => {
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
        <KeyboardAvoidingView style={styles.container}>
            <Button
            onPress={this.navigateToSignIn}
            title="You have an account ?"
            style={styles.button}
            />
            <Formik
            initialValues={{ username: this.state.username, email: this.state.email, password: this.state.password }}
            onSubmit={values => {
                this.setState({username: values.username, email: values.email, password: values.password});
                this.onSignUpPress()
            }}
            >
            {props => (
            <View style={styles.form}>
                <View style={styles.formContent}>
                    <Image source={require('../../../assets/images/user.png')} style={styles.iconInput}></Image>
                    <TextInput
                        onChangeText={props.handleChange('username')}
                        onBlur={props.handleBlur('username')}
                        value={props.values.username}
                        placeholder="Username"
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <Image source={require('../../../assets/images/user.png')} style={styles.iconInput}></Image>
                    <TextInput
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email}
                        placeholder="Email"
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <Image source={require('../../../assets/images/locker.png')} style={styles.iconInput}></Image>
                    <TextInput
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password}
                        placeholder="password"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                <Button onPress={props.handleSubmit} title="Submit" />
            </View>
            )}
            </Formik>
            <Text>{this.state.error}</Text>
        </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#55ffff"
    },  
    form: {
        top: '20%'
      },
    formContent: {
        width: '70%',
        marginLeft: '15%',
        flexDirection: 'row',
        backgroundColor: '#ff55ff'
    },
    iconInput: {
        width: 20,
        height: 20
    },
    input: {
        flex: 1,
    },
    button: {
        top: '0%'
    }
});

export default Register;