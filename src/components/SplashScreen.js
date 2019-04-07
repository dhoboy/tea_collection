import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  AsyncStorage,
  TextInput
} from 'react-native';

import DenongHeader from 'components/DenongHeader';

class SplashScreen extends React.Component {
  render() {
    return (
      <DenongHeader />
    );
  }
}

export default SplashScreen;
