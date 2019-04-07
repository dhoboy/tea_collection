import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

import DenongHeader from 'components/DenongHeader';
import InventoryDetailRow from 'components/InventoryDetailRow';
import { TouchableOpacity } from 'react-native-gesture-handler';

class InventoryDetail extends React.Component {
  removeTea = () => {
    let teaName = this.props.navigation.getParam('teaName');
    
    AsyncStorage.getItem('denongAllTeaNames').then(resp => {
      let teas = JSON.parse(resp);
      let i = teas.indexOf(teaName);
      teas = teas.slice(0, i).concat(teas.slice(i + 1));
      return teas;
    }).then(nextTeas => {
      // clear the tea and all of it's data
      return Promise.all([
        AsyncStorage.setItem('denongAllTeaNames', JSON.stringify(nextTeas)),
        AsyncStorage.removeItem(`${teaName}-cabinet`),
        AsyncStorage.removeItem(`${teaName}-storeroom`),
        AsyncStorage.removeItem(`${teaName}-warehouse`)
      ]);
    }).then(resp => {
      this.props.navigation.goBack();
    });
  }
  
  render() {
    let teaName = this.props.navigation.getParam('teaName');
    let image = this.props.navigation.getParam('image');
    let cabinet = this.props.navigation.getParam('cabinet');
    let storeroom = this.props.navigation.getParam('storeroom');
    let warehouse = this.props.navigation.getParam('warehouse');
     
    let displayTeaName = teaName.split("-")[0];
    let size = teaName.split("-")[1];
    
    displayTeaName = displayTeaName.split("_").map(piece => {
      return piece.charAt(0).toUpperCase() + piece.slice(1);
    }).join(" ");

    return (
      <View style={{ flex: 1 }}>
        <DenongHeader />
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}} behavior="padding" enabled keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.detail}>
            <Image 
              source={image} 
            />
            <Text style={styles.teaNameText}>
              {displayTeaName}
            </Text>
            <Text style={styles.sizeText}>
              {size}
            </Text>

              <View>
                <InventoryDetailRow 
                  teaName={teaName}
                  count={cabinet}
                  loc={"cabinet"}
                />
              </View>
              <View>
                <InventoryDetailRow 
                  teaName={teaName}
                  count={storeroom}
                  loc={"storeroom"}
                />
              </View>
              <View style={styles.lastRow}>
                <InventoryDetailRow 
                  teaName={teaName}
                  count={warehouse}
                  loc={"warehouse"}
                />
              </View>
            
            <TouchableOpacity onPress={this.removeTea}>
              <View style={styles.removeButton}>
                <Text style={styles.removeButtonText}>
                  Remove
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  detail: {
    alignItems: "center",
    marginTop: 20
  },
  lastRow: {
    paddingBottom: 60
  },
  scroll: {
    paddingBottom: 40
  },
  teaNameText: {
    marginTop: 15,
    fontSize: 20
  },  
  sizeText: {
    marginTop: 8,
    fontSize: 16
  },
  removeButton: {
    borderRadius: 4,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    backgroundColor: "firebrick",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "700"
  }
});


export default InventoryDetail;
