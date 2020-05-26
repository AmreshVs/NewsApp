import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Main from '@screen/main';
import Login from '@screen/login';
import Signup from '@screen/signup';
import Home from '@screen/home';
import Test from '@screen/test';
import VerticalFullScreenVideo from '@screen/verticalFullScreenVideo';
import PDFViewer from '@screen/pdfViewer';
import NewsDetail from '@screen/newsDetail';

const Stack = createStackNavigator();

const Routes = () => {
  return (  
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VerticalFullScreenVideo" component={VerticalFullScreenVideo} />
      <Stack.Screen name="PDFViewer" component={PDFViewer} />
      <Stack.Screen name="NewsDetail" component={NewsDetail} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  )
}

export default Routes;