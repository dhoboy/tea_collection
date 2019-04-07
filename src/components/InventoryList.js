import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import { NavigationEvents } from 'react-navigation';

// load in components
import Icon from 'react-native-vector-icons/FontAwesome';
import DenongHeader from 'components/DenongHeader';
import InventoryListRow from 'components/InventoryListRow';

// load in all available images
// change to pull these from the website
import bulang_2018 from 'images/2018_bulang.jpg';
import cherishing_destiny_raw_2018 from 'images/2018_cherishing_destiny_raw.jpg';
import cherishing_destiny_ripe_2018 from 'images/2018_cherishing_destiny_ripe.jpg';
import gu_yun_2018 from 'images/2018_gu_yun.jpg';
import nannuo_2018 from 'images/2018_nannuo.jpg';
import new_factory_ripe_2018 from 'images/2018_new_factory_ripe.jpg';
import sen_yun_2018 from 'images/2018_sen_yun.jpg';
import yiwu_2018 from 'images/2018_yiwu.jpg';
import raw_2006 from 'images/2006_raw.jpg';
import jing_mai_2007 from 'images/2007_jing_mai.jpg';
import raw_2010 from 'images/2010_raw.jpg';
import elegant_tranquility_2015 from 'images/2015_elegant_tranquility.jpg';
import bulang_2016 from 'images/2016_bulang.jpg';
import sweet_clarity_2016 from 'images/2016_sweet_clarity.jpg';
import jing_mai_meng_bin_2017 from 'images/2017_jing_mai_meng_bin.jpg';
import jing_mai_2018 from 'images/2018_jing_mai.jpg';
import mountain_oasis_2017 from 'images/2017_mountain_oasis.jpg';
import emerald_essence_2018 from 'images/2018_emerald_essence.jpg';
import millenium_nannuo_2018 from 'images/2018_millenium_nannuo.jpg';
import orchid_2018 from 'images/2018_orchid.jpg';
import chrysanthemum_2018 from 'images/2018_chrysanthemum.jpg';
import plum_blossom_2018 from 'images/2018_plum_blossom.jpg';
import bamboo_2018 from 'images/2018_bamboo.jpg';
import ripe_2004 from 'images/2004_ripe.jpg';
import ginseng_scent_2005 from 'images/2005_ginseng_scent.jpg';
import millenium_distant_mountains_2005 from 'images/2005_millenium_distant_mountains.jpg';
import wild_ripe_2015 from 'images/2015_wild_ripe.jpg';
import mini_tuo_cha_2016 from 'images/2016_mini_tuo_cha.jpg';
import black_essence_2018 from 'images/2018_black_essence.jpg';
import song_song_cha_2018 from 'images/2018_song_song_cha.jpg';
import wild_ripe_2018 from 'images/2018_wild_ripe.jpg';
import feng_fragrance_2000 from 'images/2000_feng_fragrance.jpg';

class InventoryList extends React.Component {
  state = {
    teas: [], // array of the strings of each inventory item
    images: {}, // map of images loaded in above
    filterText: "",
  }

  // this event fires when you navigate back from the Add New tea screen
  willFocus(payload) {
    this.loadData();
  }

  // get the master list of all tea names
  loadData() {
    //AsyncStorage.setItem('denongAllTeaNames', "");
    AsyncStorage.getItem('denongAllTeaNames').then(resp => {
      if (resp !== null) {
        this.setState({
          teas: JSON.parse(resp)
        });
      } else { // initialize it if not there
        AsyncStorage.setItem('denongAllTeaNames', '');
      }
    });
  }

  componentDidMount() {
    // get master list of all tea names
    this.loadData();
    
    // set loaded images in state
    this.setState({
      images: {
        bulang_2018,
        cherishing_destiny_raw_2018,
        cherishing_destiny_ripe_2018,
        gu_yun_2018,
        nannuo_2018,
        new_factory_ripe_2018,
        sen_yun_2018,
        yiwu_2018,
        raw_2006,
        jing_mai_2007,
        raw_2010,
        elegant_tranquility_2015,
        bulang_2016,
        sweet_clarity_2016,
        jing_mai_meng_bin_2017,
        jing_mai_2018,
        mountain_oasis_2017,
        emerald_essence_2018,
        millenium_nannuo_2018,
        orchid_2018,
        chrysanthemum_2018,
        plum_blossom_2018,
        bamboo_2018,
        ripe_2004,
        ginseng_scent_2005,
        millenium_distant_mountains_2005,
        wild_ripe_2015,
        mini_tuo_cha_2016,
        black_essence_2018,
        song_song_cha_2018,
        wild_ripe_2018,
        feng_fragrance_2000
      }
    });
  }
  
  // what you would expect from using normal react, but updating
  // top level state here not propogating changes down to child components
  /*incrementTeaValue = (teaName, loc) => {
    this.setState(prevState => {
      let nextState = Object.assign({}, prevState);
      let teas = nextState.teas;
      
      let i = teas.map(a => a.name).indexOf(teaName);
      let tea = teas[i];
      tea[loc] = tea[loc] + 1;
      nextState.teas = teas;
      return nextState;
    });
  }

  decrementTeaValue = (teaName, loc) => {

  }*/

  addNewTea = () => {
    this.props.navigation.navigate('NewTea');
  }
  
  render() {
    return (
      <View style={styles.page}>    
        <NavigationEvents
          onWillFocus={payload => this.willFocus(payload)}
        />    
        <DenongHeader />
        <View style={styles.page}>
          <TextInput
            style={styles.input}
            placeholder="Search for a tea"
            onChangeText={text => {
              this.setState({ filterText: text });
            }}
            value={this.state.filterText}
          />
          <FlatList
            style={styles.page}
            data = {this.state.teas.filter(tea => {
              return tea.toLowerCase().indexOf(this.state.filterText.toLowerCase()) > -1;
            })}
            renderItem={({ item, index }) => {
              let teaNameNoYear = item.split("-")[0];
              return (
                <InventoryListRow 
                  teaName={item} 
                  index={index} 
                  navigation={this.props.navigation}
                  image={this.state.images[teaNameNoYear]}
                />
              );
            }}
            keyExtractor={item => item}
          />
        </View>
        <TouchableOpacity onPress={this.addNewTea}>
        <View style={styles.addNew}>          
          <View style={styles.addNewContents}>
            <Icon 
              color={"dodgerblue"} 
              size={20}
              name={"plus-circle"} 
            />
            <Text style={styles.addNewText}>Add New Tea</Text>
          </View>
        </View>
        </TouchableOpacity>
      </View>
    );  
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  input: {
    marginTop: 15,
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff'
  },
  addNew: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  addNewContents: {
    flexDirection: "row"
  },  
  addNewText: {
    marginLeft: 5,
    marginTop: 1,
    fontFamily: "Helvetica Neue",   
  }
});

export default InventoryList;
