import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '@screen/main';
import Login from '@screen/login';
import Signup from '@screen/signup';
import Home from '@screen/home';
import VerticalFullScreenVideo from '@screen/verticalFullScreenVideo';

const Stack = createStackNavigator();

const Routes = () => {
  return (  
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VerticalFullScreenVideo" component={VerticalFullScreenVideo} />
    </Stack.Navigator>
  )
}

export default Routes;