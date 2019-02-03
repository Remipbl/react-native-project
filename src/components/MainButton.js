// @flow
import React from 'react';
import { View, Text, Image } from 'react-native';
import WOLF_IMAGE from '../config/constants/Images';

type Props = {
    imgUri: string,
    buttonText: string,
};
  
class MainButton extends React.Component<Props> {
    render() {
        return (
            <View>
            <Image source={require(WOLF_IMAGE)}/>
                <Text>{this.props.buttonText}</Text>
            </View>
        )
    }
}

export default MainButton;