import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";

import InventoryList from 'components/InventoryList';
import InventoryDetail from 'components/InventoryDetail';
import NewTea from 'components/NewTea';

const AppNavigator = createStackNavigator({
  Home: {
    screen: InventoryList
  },
  Info: {
    screen: InventoryDetail
  },
  NewTea: {
    screen: NewTea
  }
});


export default createAppContainer(AppNavigator);
