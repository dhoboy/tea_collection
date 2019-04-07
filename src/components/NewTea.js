import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import DenongHeader from 'components/DenongHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';

class NewTea extends React.Component {
  state = {
    tea: "",
    year: "",
    itemSize: "",
    cabinet: "",
    storeroom: "",
    warehouse: "",
    errorFields: [], // to show error messages
  }

  clear = () => {
    this.setState({
      tea: "",
      year: "",
      itemSize: "",
      cabinet: "",
      storeroom: "",
      warehouse: "",
      errorFields: [], // to show error messages
    });
  }
  
  set = (what, text) => {
    this.setState({
      [what]: text,
    });
  }

  save = () => {
    console.log("save baba");
    let {
      tea,
      year,
      itemSize,
      cabinet,
      storeroom,
      warehouse
    } = this.state;

    // trim off any whitespace
    tea = tea.trim();
    year = year.trim();
    itemSize = itemSize.trim();
    cabinet = cabinet.trim();
    storeroom = storeroom.trim();
    warehouse = warehouse.trim();

    // blur all input fields
    this.teaInput.blur();
    this.yearInput.blur();
    this.itemSizeInput.blur();
    this.cabinetInput.blur();
    this.storeroomInput.blur(); 
    this.warehouseInput.blur();

    // check fields for errors
    let errorFields = [];

    if (tea === "") {
      errorFields = errorFields.concat(["tea"]);
    }

    if (year === "" || isNaN(year)) {
      errorFields = errorFields.concat(["year"]);
    } 

    if (itemSize === "") {
      errorFields = errorFields.concat(["itemSize"]);
    }

    if (cabinet === "" || isNaN(cabinet)) {
      errorFields = errorFields.concat(["cabinet"]);
    }

    if (storeroom === "" || isNaN(storeroom)) {
      errorFields = errorFields.concat(["storeroom"]);
    }

    if (warehouse === "" || isNaN(warehouse)) {
      errorFields = errorFields.concat(["warehouse"]);
    }

    // write it all to AsyncStorage
    if (errorFields.length === 0) {
      AsyncStorage.getItem('denongAllTeaNames').then(resp => {
        // form tea name
        let formedTeaName = "";
        formedTeaName = tea.trim().toLowerCase().split(" ").join("_");
        formedTeaName = `${formedTeaName}_${year}-${itemSize}`;

        // add tea name to existing list of tea names
        let allTeaNames = JSON.parse(resp);
        if (Array.isArray(allTeaNames)) {
          allTeaNames = allTeaNames.concat([formedTeaName])
        } else {
          allTeaNames = [formedTeaName];
        }
      
        AsyncStorage.setItem('denongAllTeaNames', JSON.stringify(allTeaNames));

        // write all this tea's data 
        AsyncStorage.setItem(`${formedTeaName}-cabinet`, cabinet);
        AsyncStorage.setItem(`${formedTeaName}-storeroom`, storeroom);
        AsyncStorage.setItem(`${formedTeaName}-warehouse`, warehouse);
        
        // reset state and go back to list page
        this.setState({
          tea: "",
          year: "",
          itemSize: "",
          cabinet: "",
          storeroom: "",
          warehouse: "",
          errorFields: [],
        }, () => { this.props.navigation.goBack(); });
      });
    } else { // alert user of errors in UI
      this.setState({
        errorFields
      });
    }
  }
  
  render() {
    const { errorFields } = this.state;

    let teaError = errorFields.indexOf("tea") > -1;
    let yearError = errorFields.indexOf("year") > -1;
    let itemSizeError = errorFields.indexOf("itemSize") > -1;
    let cabinetError = errorFields.indexOf("cabinet") > -1;
    let storeroomError = errorFields.indexOf("storeroom") > -1;
    let warehouseError = errorFields.indexOf("warehouse") > -1;

    return (
      <View style={styles.container}>
        <DenongHeader />
        <View style={styles.viewTitle}>
          <Text style={styles.title}>Add New Tea</Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center'}} behavior="padding" enabled keyboardVerticalOffset={80}>
        <ScrollView contentContainerStyle={styles.scrollForm}>
          <View style={styles.row}>
            <TextInput
              ref={r => this.teaInput = r}
              onChangeText={(text) => this.set("tea", text)}
              value={this.state.tea}
              style={teaError ? styles.errorInput : styles.input}
            />
            <View style={styles.labelRow}>
              <Text style={teaError ? styles.errorLabel : styles.label}>
                Tea Name
              </Text>
              {teaError ? <Text style={styles.errorText}>Enter a value</Text> : null}
            </View>
          </View>
          
          <View style={styles.row}>
            <TextInput
              ref={r => this.yearInput = r}
              onChangeText={(text) => this.set("year", text)}
              value={this.state.year}
              style={yearError ? styles.errorInput : styles.input}
            />
            <View style={styles.labelRow}>
              <Text style={yearError ? styles.errorLabel : styles.label}>
                Year
              </Text>
              {yearError ? <Text style={styles.errorText}>Enter a number</Text> : null}
            </View>            
          </View>
          <View style={styles.row}>
            <TextInput
              ref={r => this.itemSizeInput = r}
              onChangeText={(text) => this.set("itemSize", text)}
              value={this.state.itemSize}
              style={itemSizeError ? styles.errorInput : styles.input}
            />
            <View style={styles.labelRow}>
              <Text style={itemSizeError ? styles.errorLabel : styles.label}>
                Item Size (ex: 100g)
              </Text>
              {itemSizeError ? <Text style={styles.errorText}>Enter a value</Text> : null}
            </View>
          </View>
          <View style={styles.row}>
            <TextInput
              ref={r => this.cabinetInput = r}
              onChangeText={(text) => this.set("cabinet", text)}
              value={this.state.cabinet}
              style={cabinetError ? styles.errorInput : styles.input}
            />
            <View style={styles.labelRow}>
              <Text style={cabinetError ? styles.errorLabel : styles.label}>
                Cabinet
              </Text>
              {cabinetError ? <Text style={styles.errorText}>Enter a number</Text> : null}
            </View>
          </View> 
          <View style={styles.row}>
            <TextInput
              ref={r => this.storeroomInput = r}
              onChangeText={(text) => this.set("storeroom", text)}
              value={this.state.storeroom}
              style={storeroomError ? styles.errorInput : styles.input}
            />
            <View style={styles.labelRow}>
              <Text style={storeroomError ? styles.errorLabel : styles.label}>
                Storeroom
              </Text>
              {storeroomError ? <Text style={styles.errorText}>Enter a number</Text> : null}
            </View>
          </View>
          <View style={styles.row}>
            <TextInput
              ref={r => this.warehouseInput = r}
              onChangeText={(text) => this.set("warehouse", text)}
              value={this.state.warehouse}
              style={warehouseError ? styles.errorInput : styles.input}
            />
            <View style={styles.labelRow}>
              <Text style={warehouseError ? styles.errorLabel : styles.label}>
                Warehouse
              </Text>
              {warehouseError ? <Text style={styles.errorText}>Enter a number</Text> : null}
            </View>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={this.clear}>
              <View style={styles.clearButton}>
                <Text style={styles.clearButtonText}>
                  Clear
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <View style={styles.saveButton}>
                <Text style={styles.saveButtonText}>
                  Save
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center'
  },
  scrollForm: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    paddingBottom: 40,
  },
  viewTitle: {
    marginTop: 15
  },
  title: {
    fontSize: 20,
    fontFamily: "Helvetica Neue",
    color: "#6f6f6f",
    letterSpacing: 2
  },
  row: {
    flexDirection: "column",
    marginTop: 30
  },
  input: {
    borderColor: '#ddd',
    borderBottomWidth: 1,
    width: 200,
    paddingHorizontal: 5
  },
  errorInput: {
    borderColor: 'firebrick',
    borderBottomWidth: 1,
    width: 200,
    paddingHorizontal: 5
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Helvetica Neue",
    color: "#6f6f6f",
    letterSpacing: 2
  }, 
  errorLabel: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: "Helvetica Neue",
    color: "firebrick",
    letterSpacing: 2
  }, 
  errorText: {
    fontSize: 10,
    fontWeight: "700",
    color: "firebrick",
    marginTop: 5
  },  
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    paddingTop: 30
  },
  saveButton: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: "dodgerblue",
  },
  clearButton: {
    borderColor: "#6f6f6f",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },  
  clearButtonText: {
    color: "#6f6f6f",
    fontWeight: "700"
  },  
  saveButtonText: {
    color: "#fff",
    fontWeight: "700"
  }
});

export default NewTea;
