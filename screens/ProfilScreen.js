import React from 'react';
import { StyleSheet, Text, Button, View, Image, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import { ImagePicker, Constants, Permissions } from 'expo';
import ActionSheet from 'react-native-zhb-actionsheet';
import uuid from 'uuid';

import { AuthService } from './../services/auth'; 
import { User } from './../models/user';

console.disableYellowBox = true;

export default class ProfilScreen extends React.Component {
    state = {
        loading: false,
        image: null,
        uploading: false,
        titles: [{title: 'Camera', action: () => {console.log('click Camera');}},
        {title: 'Choose from Album', actionStyle: 'default', action: () => {console.log('click Choose from Album');}},
        {title: 'Delete', actionStyle: 'destructive', action: () => {console.log('click Delete');}},
        {title: 'Cancel', actionStyle: 'cancel', action: () => {console.log('click Cancel');}}]
    };

  constructor(props) {
    super(props);
    this.user = new User('','','');
    this.state = {loading: false};
    this.authService = new AuthService();
    this.authService.getUserInformations().subscribe(user => {
        if (user.image != undefined) {
            this.user = new User(user.id, user.email, user.username, user.image);
            this.setState({image:user.image});
        } else {
            this.user = new User(user.id, user.email, user.username);
        }
        this.setState({loading: false});
    });
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
      this._handleImagePicked(pickerResult);
    }
  };

  _takePhoto = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!pickerResult.cancelled) {
        this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    try {
        this.setState({ uploading: true });

        uploadUrl = await uploadImageAsync(pickerResult.uri, this.user.id, this.authService);
        this.setState({ image: uploadUrl });
        this.user.image = uploadUrl;
        this.authService.updateUser(this.user).subscribe(res => {
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
        if (this.state.image != null) {
            return (
                <Image
                style={styles.imageProfil}
                source={{ uri: image }}
                />
            );
        } else {
            return (
                <Image
                style={styles.imageProfil}
                source={require('../assets/images/profil.png')}
                />
            );
        }
  }

  logout() {
    firebase.auth().signOut();
    this.props.navigation.navigate('Auth');
  }

  render() {
        if (this.state.loading) {
            return (
                <Text>Loading</Text>
            );
        } else {
            return (
                <View style={styles.container}>
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
                    <TouchableHighlight style={styles.imageContainer} onPress={() => this.refs.picker.show()}>
                        {this.renderImage()}
                    </TouchableHighlight>
                    <Text style={styles.nameUser}>{this.user.username}</Text>
                    <Text
                    onPress={this.logout.bind(this)}>
                        Log Out
                    </Text>
                </View>
            )
        }
  }

}


async function uploadImageAsync(uri, user_id, authService) {
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
  
    // We're done with the blob, close and release it
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        marginTop: 0,
        alignItems: 'center'
    },
    imageContainer: {
        height:128,
        width: 128,
        borderRadius: 64
    },
    imageProfil: {
        height:128,
        width: 128,
        borderRadius: 64
    },
    nameUser: {

    }
});
