import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '../screen/main/index';

const Stack = createStackNavigator();

const Routes = () => {
  return (  
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  )
}

export default Routes;