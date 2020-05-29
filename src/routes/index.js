import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { ApplicationProvider } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';

import { DrawerNavigator } from '@routes/drawer';
import { default as lightTheme } from '@theme/light.json';
import { default as darkTheme } from '@theme/dark.json';
import Main from '@screen/main';
import Login from '@screen/login';
import Signup from '@screen/signup';
import Test from '@screen/test';
import VerticalFullScreenVideo from '@screen/verticalFullScreenVideo';
import PDFViewer from '@screen/pdfViewer';
import NewsDetail from '@screen/newsDetail';
import AllPdfs from '@screen/allPdfs';

const Stack = createStackNavigator();

const Routes = ({ theme }) => {

  return (
    <ApplicationProvider mapping={mapping} theme={theme === 'light' ? lightTheme : darkTheme}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Root" component={DrawerNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="VerticalFullScreenVideo" component={VerticalFullScreenVideo} />
        <Stack.Screen name="PDFViewer" component={PDFViewer} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} />
        <Stack.Screen name="AllPdfs" component={AllPdfs} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </ApplicationProvider>
  )
}

const mapStateToProps = state => state.common;

export default connect(mapStateToProps)(Routes);