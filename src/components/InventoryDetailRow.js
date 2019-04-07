import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


class InventoryDetailRow extends React.Component {
  state = {
    count: 0
  }

  componentDidMount() {
    const {
      teaName,
      count, 
      loc
    } = this.props;
    
    AsyncStorage.getItem(`${teaName}-${loc}`).then(data => {
      this.setState({
        count: +data
      });
    });
  }

  setCount(value) {
    if (!isNaN(value)) {
      const {
        teaName, 
        loc
      } = this.props;
  
      this.setState({
        count: +value
      });

      AsyncStorage.setItem(`${teaName}-${loc}`, `${value}`);  
    }
  }

  onPlusPressed = () => {
    const {
      teaName, 
      loc
    } = this.props;

    let count = this.state.count;
    let nextCount = +count + 1;

    this.setState({
      count: nextCount
    });

    AsyncStorage.setItem(`${teaName}-${loc}`, `${nextCount}`);
  
    // just incase you had it active and clicked elsewhere
    this.input.blur();
    
    //this.props.incrementTeaValue(tea.name, loc);
  }

  onMinusPressed = () => {
    const {
      teaName, 
      loc
    } = this.props;

    let count = this.state.count;
    let nextCount = null;
    if (count > 0) {
      nextCount = +count - 1;
    } else {
      nextCount = 0;
    }
    
    this.setState({
      count: nextCount
    });

    AsyncStorage.setItem(`${teaName}-${loc}`, `${nextCount}`);
    
    // just incase you had it active and clicked elsewhere
    this.input.blur();

    //this.props.decrementTeaValue(tea.name, loc);
  }

  render() {
    console.log("this.props detail row: ", this.props);
    
    const {
      teaName, 
      loc 
    } = this.props;

    return (
      <View style={styles.row}>
        <View>
          <Text 
            style={styles.loc}
            onPress={() => { this.input.blur(); }}
          >
            {loc.charAt(0).toUpperCase() + loc.slice(1)}
          </Text>
        </View>
        <View style={styles.numberPlusMinus}>
          <TouchableOpacity
            onPress={this.onMinusPressed}
          >
            <View style={styles.minusWrappingView}>
              <Icon 
                style={styles.minus}
                name={"minus"} 
              />
            </View>
          </TouchableOpacity>
          <TextInput 
            ref={r => this.input = r}
            onChangeText={(text) => { this.setCount(text); }}
            value={`${this.state.count}`}
            style={styles.number}
          />
          <TouchableOpacity
            onPress={this.onPlusPressed}
          >
            <View style={styles.plusWrappingView}>
              <Icon 
                style={styles.plus}
                name={"plus"} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    marginTop: 38
  },
  numberPlusMinus: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 140
  },
  plusWrappingView: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    marginTop: -10
  },
  plus: {
    marginTop: 0,
    fontSize: 25
  },
  minusWrappingView: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    marginTop: -10
  },
  minus: {
    marginTop: 0,
    fontSize: 25
  },
  number: {
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
    marginTop: -10
  },
  loc: {
    fontSize: 16,
    marginTop: 2
  }
});

export default InventoryDetailRow;

