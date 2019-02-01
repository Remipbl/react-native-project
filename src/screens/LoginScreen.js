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
  KeyboardAvoidingView,
  TouchableHighlight
} from 'react-native';
import { WebBrowser } from 'expo';
import { Formik } from 'formik';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        <Image source={require('../../assets/images/background.png')} style={styles.background}></Image>
        <View style={styles.containerLogo}>
          <Image source={require('../../assets/images/logoJustMeet.png')} style={styles.logo}></Image>
        </View>
        <View style={styles.containerForm}>
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
                  placeholder="Password"
                  secureTextEntry
                  style={styles.input}
                />
              </View>
              <View style={styles.error}>
                <Text style={styles.errorText}>{this.state.error}</Text>
              </View>
              <View style={styles.containerSubmit}>
                <TouchableHighlight style={styles.submit} onPress={props.handleSubmit}>
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableHighlight>
              </View>
            </View>
          )}
          </Formik>
        </View>
        <View style={styles.register}>
          <TouchableHighlight style={styles.registerButton} onPress={this.navigateToSignUp.bind(this)}>
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account ?</Text>
              <Text style={styles.registerTextBold}> Sign up</Text>
            </View>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  containerLogo: {
    flex: 3,
    marginBottom: 100
  },
  logo: {
    width: '100%',
    height: '100%',
    marginTop: 50,
    resizeMode: 'contain',
  },
  containerForm: {
    top: 0,
    flex: 2
  },
  form: {
    top: 0,
    flex: 1
  },
  formContent: {
    width: '70%',
    marginLeft: '15%',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 20
  },
  iconInput: {
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  input: {
    flex: 9,
    marginLeft: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    color: 'white'
  },
  error: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  errorText: {
    color: 'red'
  },
  containerSubmit: {
    flex: 1,
    width: '40%',
    marginLeft: '30%',
  },
  submit: {
    flex: 1,
    backgroundColor: '#ffffff50',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  submitText: {
    color: 'white',
  },
  register: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'
  },
  registerButton: {
    width: '50%'

  },
  registerContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  registerText: {
    color: 'white',
    
    width: '74%'
  },
  registerTextBold: {
    color: 'white',
    fontWeight: 'bold',
    width: '26%'
    
  }
});
