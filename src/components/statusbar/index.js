import React from 'react';
import { View, StatusBar as Status } from 'react-native';

const StatusBar = () => {
  return(
    <View style={{paddingTop: Status.currentHeight}} />
  )
}

export default StatusBar;