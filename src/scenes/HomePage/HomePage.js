// @flow
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

type Props = {
  navigation: any,
};

type State = {
  
};

class HomePage extends React.Component<Props, State> {
  goToProfil = () => {
    this.props.navigation.navigate('profil');
  }

  onPressCategories = () => {
    this.props.navigation.navigate('categories');
  }

  onPressProfile = () => {
    this.props.navigation.navigate('profile');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/background.png')} style={styles.background}></Image>
        <View style={styles.containerHeader}>
          <View>
            <Image source={require('../../../assets/images/Avatar2.png')} style={styles.PicturePofile}></Image>
          </View>
          <View>
            <Text style={styles.textButtons}>John Doe</Text>
          </View>
        </View>
        <View style={styles.containerMainButtons}>
          <View style={styles.subContainerMainButtons}>
            <TouchableOpacity>
              <View style={styles.squares}>
                <Image source={require('../../../assets/images/event.png')} style={styles.imgButtons}></Image>
                <Text style={styles.textButtons}>Events</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.squares}>
                <Image source={require('../../../assets/images/calendar.png')} style={styles.imgButtons}></Image>
                <Text style={styles.textButtons}>Calendar</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.subContainerMainButtons}>
            <TouchableOpacity onPress={this.onPressCategories}>
            <View style={styles.squares}>
              <Image source={require('../../../assets/images/clipboards.png')} style={styles.imgButtons}></Image>
              <Text style={styles.textButtons}>Categories</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressProfile}>
            <View style={styles.squares}>
              <Image source={require('../../../assets/images/help.png')} style={styles.imgButtons}></Image>
              <Text style={styles.textButtons}>Infos</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerFooter}>
        <View style={styles.containerText}>
          <Text style={styles.textButtons}>Current events</Text>
          <View style={styles.circles}>
            <Text style={styles.textButtons}>5</Text>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.textButtons}>Current events</Text>
          <View style={styles.circles}>
            <Text style={styles.textButtons}>5</Text>
          </View>
        </View>
        <View style={styles.containerText}>
          <Text style={styles.textButtons}>Current events</Text>
          <View style={styles.circles}>
            <Text style={styles.textButtons}>5</Text>
          </View>
        </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  PicturePofile: {
    width: 120,
    height: 120,
  },
  textButtons: {
    color: 'white',
  },
  imgButtons: {
    width: 80,
    height: 80,
  },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerMainButtons: {
    flex: 2,
  },
  containerText: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  containerFooter: {
    flexDirection: 'row',
    alignContent: 'center',
    marginBottom: 50,
    flex: 0.5,
    paddingTop: 50,
  },
  subContainerMainButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  squares: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: 150,
    height: 150,
    backgroundColor: '#ffffff50',
    borderRadius: 5,
  },
  circles: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#ffffff50',
    borderRadius: 50,
  }
});

export default HomePage;