// @flow
import React from 'react';
import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

type Props = {
  navigation: any,
};

class Categories extends React.Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/background.png')} style={styles.background}></Image>
        <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Sport'},
            {key: 'Food'},
            {key: 'Arts'},
            {key: 'Music'},
            {key: 'Studies'},
            {key: 'video games'},
            {key: 'Party'},
            {key: 'Outdor Activities'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
   },
   item: {
     padding: 10,
     fontSize: 18,
     height: 44,
     color: 'white',
   },
  background: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
});

export default Categories;