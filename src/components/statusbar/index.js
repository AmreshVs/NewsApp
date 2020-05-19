import React from 'react';
import { View, StatusBar as Status } from 'react-native';
import { hasNotch } from 'react-native-device-info';

const StatusBar = () => {
  const havingNotch = hasNotch();
  return(
    <View style={ havingNotch === true ? {paddingTop: Status.currentHeight} : {}} />
  )
}

export default StatusBar;