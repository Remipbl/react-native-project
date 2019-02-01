// @flow
import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { WebBrowser } from 'expo';
import { Formik } from 'formik';

import { MonoText } from '../components/StyledText';

import auth from './../services/auth'; 

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {email:'', password:'', error:'', loading: false};
  }
  
  onLoginPress() {
    this.setState({error:'', loading: true});

    auth.signin({email: this.state.email, password: this.state.password})
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

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={require('../../assets/images/background.png')} style={styles.test}></Image>
        <Image source={require('../../assets/images/logoJustMeet.png')} style={styles.logo}></Image>
        <Formik
          initialValues={{ email: this.state.email, password: this.state.password }}
          onSubmit={values => {
            this.setState({email: values.email, password: values.password});
            this.onLoginPress()
          }}
        >
        {props => (
          <View style={styles.form}>
            <View style={styles.formContent}>
              <Image source={require('../../assets/images/user.png')} style={styles.iconInput}></Image>
              <TextInput
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                value={props.values.email}
                placeholder="Email"
                style={styles.input}
              />
            </View>
            <View style={styles.formContent}>
              <Image source={require('../../assets/images/locker.png')} style={styles.iconInput}></Image>
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
        <Button
        onPress={this.navigateToSignUp.bind(this)}
        title="Don't have an account ? Sign up"
        ></Button>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  test: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  logo: {
    position: 'absolute',
    top: 50,
    width: 300,
    left: 60,
    height: 300
  },
  form: {
    top: '70%'
  },
  formContent: {
    width: '70%',
    marginLeft: '15%',
    flexDirection: 'row'
  },
  iconInput: {
    width: 20,
    height: 20
  },
  input: {
  }
});
