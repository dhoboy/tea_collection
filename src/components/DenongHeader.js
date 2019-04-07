import React from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
} from 'react-native';

import DenongImage from 'images/DenongImage.png';

class DenongHeader extends React.Component {
  render() {
    return (
      <View style={{
        marginTop: 20,
        alignItems: 'center'
      }}>
        <Image 
          style={{width: 300, height: 60}}
          source={DenongImage} 
        />
        <Text style={{
          marginTop: 10,
          fontSize: 30,
          fontFamily: "Helvetica Neue",
          color: "#6f6f6f",
          letterSpacing: 3
        }}>
          Collection
        </Text>
      </View>
    );
  }
}

export default DenongHeader;
