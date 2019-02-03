import React from 'react';
import { StyleSheet, Text, Button, View, TextInput, Image, KeyboardAvoidingView, TouchableHighlight } from 'react-native';
import { CheckBox } from 'react-native-elements';
import * as firebase from 'firebase';
import { Formik } from 'formik';
import { ImagePicker, Permissions } from 'expo';
import ActionSheet from 'react-native-zhb-actionsheet';
import uuid from 'uuid';

import auth from '../../config/api/services/auth'; 

class Register extends React.Component {
    state = {};

  constructor(props) {
    super(props);
    this.state = {
        email:'',
        password:'',
        error:'',
        image: null,
        loading: false,
        maleChecked: true,
        femaleChecked: false,
        titles: [{title: 'Camera', action: () => {console.log('click Camera');}},
        {title: 'Choose from Album', actionStyle: 'default', action: () => {console.log('click Choose from Album');}},
        {title: 'Delete', actionStyle: 'destructive', action: () => {console.log('click Delete');}},
        {title: 'Cancel', actionStyle: 'cancel', action: () => {console.log('click Cancel');}}]
    };
  }

  onSignUpPress() {
    this.setState({error:'', loading: true});
    if (this.checkCredentials()) {
        auth.signup({
            email: this.state.email,
            password: this.state.password,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            gender: this.state.gender,
            age: this.state.age,
            nationality: this.state.nationality})
        .subscribe(res => {
            if (res) {
                this.setState({id: res})
                this._handleImagePicked();
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

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
      //this._handleImagePicked(pickerResult);
      this.setState({image: pickerResult});
      console.log(this.state);
    }
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
        //this._handleImagePicked(pickerResult);
        this.setState({image: pickerResult});
        console.log(this.state);
    }
  };

  _handleImagePicked = async () => {
    try {
        this.setState({ uploading: true });

        console.log(this.state);
        uploadUrl = await uploadImageAsync(this.state.image.uri, this.state.id);
        this.setState({ image: uploadUrl });
        console.log(this.state);
        //this.user.image = uploadUrl;
        this.authService.updateUser({
            id: this.state.id,
            email: this.state.email,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            gender: this.state.gender,
            age: this.state.age,
            nationality: this.state.nationality,
            image: this.state.image
        }).subscribe(res => {
            if (res) {
                console.log(true);
            }
        });
    } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
    } finally {
        this.setState({ uploading: false });
    }
  }

  renderImage() {
    let image = this.state.image;
    if (this.state.image != null && this.state.image != undefined) {
        return (
            <Image
            source={{ uri: image.uri }}
            />
        );
    } else {
        return (
            <Image
            source={require('../../../assets/images/ProfilePicture.png')}
            />
        );
    }
  }

  render() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <Image source={require('../../../assets/images/background.png')} style={styles.background}></Image>
            <ActionSheet
                ref="picker"
                titles={[{title: 'Camera', action: this._takePhoto},
                        {title: 'Choose from Album', actionStyle: 'default', action: this._pickImage},
                        {title: 'Cancel', actionStyle: 'cancel', action: () => {console.log('click Cancel');}}]}
                separateHeight={3}
                separateColor="#dddddd"
                backgroundColor="rgba(0, 0, 0, 0.3)"
                containerStyle={{margin: 10, borderRadius: 5}}
            />
            <TouchableHighlight onPress={() => this.refs.picker.show()}>
                {this.renderImage()}
            </TouchableHighlight>
            <Formik
            initialValues={{
                f_name: this.state.f_name,
                l_name: this.state.l_name,
                age: this.state.age,
                nationality: this.state.nationality,
                gender: "male",
                email: this.state.email,
                password: this.state.password }}
            onSubmit={values => {
                this.setState({
                    f_name: values.f_name,
                    l_name: values.l_name,
                    age: values.age,
                    nationality: values.nationality,
                    gender: values.gender,
                    email: values.email,
                    password: values.password});
                this.onSignUpPress()
            }}
            >
            {props => (
            <View style={styles.form}>
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={props.handleChange('f_name')}
                        onBlur={props.handleBlur('f_name')}
                        value={props.values.f_name}
                        placeholder="First name"
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={props.handleChange('l_name')}
                        onBlur={props.handleBlur('l_name')}
                        value={props.values.l_name}
                        placeholder="Last name"
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email}
                        placeholder="Email"
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password}
                        placeholder="password"
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={props.handleChange('age')}
                        onBlur={props.handleBlur('age')}
                        value={props.values.age}
                        placeholder="Age"
                        keyboardType='numeric'
                        maxLength={2}
                        style={styles.input}
                    />
                </View>
                <View style={styles.formContent}>
                    <Text>Gender</Text>
                    <CheckBox
                        center
                        title='Male'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.maleChecked}
                        onPress={() => {
                            this.setState({maleChecked: !this.state.maleChecked, femaleChecked: !this.state.femaleChecked});
                            props.values.gender = 'male';
                        }}
                    />
                    <CheckBox
                        center
                        title='Female'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={this.state.femaleChecked}
                        onPress={() => {
                            this.setState({maleChecked: !this.state.maleChecked, femaleChecked: !this.state.femaleChecked});
                            props.values.gender = 'female';
                        }}
                    />
                </View>
                <View style={styles.formContent}>
                    <TextInput
                        onChangeText={props.handleChange('nationality')}
                        onBlur={props.handleBlur('nationality')}
                        value={props.values.nationality}
                        placeholder="Nationality"
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
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      resizeMode: 'cover'
    },
    form: {
        top: '20%'
      },
    formContent: {
        width: '80%',
        marginLeft: '15%',
        flexDirection: 'row',
        //backgroundColor: '#ff55ff'
    },
    iconInput: {
        width: 20,
        height: 20
    },
    input: {
        flex: 1,
        color: 'white',
    },
    button: {
        top: '0%'
    }
});


async function uploadImageAsync(uri, user_id) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function(e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref('/'+user_id+'/')
      .child(uuid.v4());
    const snapshot = await ref.put(blob);
    console.log(blob);
    console.log(snapshot);
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
}

export default Register;