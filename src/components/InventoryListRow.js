import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';

// building everything this way with AsyncStorage b/c child components
// not updating when setting parent's state until page re-loads.
// not what I expect from using React on the web, so doing things this way.
// maybe could do using react navigation and forcing components to update
// on blur or will focus, but got the inventory updating working so moving on for now
class InventoryListRow extends React.Component {
  state = {
    cabinet: null,
    storeroom: null,
    warehouse: null,
  }

  rowPressed = () => {
    this.props.navigation.navigate('Info', {
      teaName: this.props.teaName,
      cabinet: this.state.cabinet,
      storeroom: this.state.storeroom,
      warehouse: this.state.warehouse,
      image: this.props.image
    });
  }

  // this event fires when you navigate back from the Info screen
  // and on the info screen, you can make changes to the count of a tea
  willFocus(payload) {
    this.loadData();
  }

  // row loads, pull its data from async storage and set in state
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let {
      teaName
    } = this.props;

    // gu_yun_2018-100g-warehouse

    // look up this tea's data from AsyncStorage
    Promise.all([
      AsyncStorage.getItem(`${teaName}-cabinet`),
      AsyncStorage.getItem(`${teaName}-storeroom`),
      AsyncStorage.getItem(`${teaName}-warehouse`),
    ]).then(resps => {
      let cabinet = resps[0];
      let storeroom = resps[1];
      let warehouse = resps[2];

      this.setState({
        cabinet: +cabinet,
        storeroom: +storeroom,
        warehouse: +warehouse
      });
    });
  }

  render() {
    const {
      teaName,
      index,
      image,
    } = this.props;

    const {
      cabinet,
      storeroom,
      warehouse
    } = this.state;

    let displayTeaName = teaName.split("-")[0];
    let size = teaName.split("-")[1];
    
    displayTeaName = displayTeaName.split("_").map(piece => {
      return piece.charAt(0).toUpperCase() + piece.slice(1);
    }).join(" ") + `-${size}`;

    return (
      <View key={teaName} style={{backgroundColor: index % 2 === 0 ? 'white': '#F3F3F7'}}>
        <NavigationEvents
          onWillFocus={payload => this.willFocus(payload)}
          onDidFocus={payload => console.log('did focus',payload)}
          onWillBlur={payload => console.log('will blur',payload)}
          onDidBlur={payload => console.log('did blur',payload)}
        />
        <TouchableHighlight
          underlayColor={'#999'}
          onPress={this.rowPressed}
        >
          <View style={styles.row}>
            <View style={styles.teaNameAndThumb}>
              <Image style={styles.teaThumb} source={image} />
              <Text style={styles.teaName}>
                {displayTeaName}
              </Text>
            </View>
            <View style={styles.count}>
              <Text>
                {cabinet + storeroom + warehouse}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  teaNameAndThumb: {
    flexDirection: 'row'
  },
  teaName: {
    marginLeft: 5,
    marginTop: 5
  },
  teaThumb: {
    height: 30,
    width: 30
  },
  count: {
    marginRight: 40,
    marginTop: 5
  } 
})

export default InventoryListRow;
