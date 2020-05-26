import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar, Platform, View } from 'react-native';
import { ApplicationProvider, IconRegistry, Text, Layout } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { default as lightTheme } from '@theme/light.json';
import {default as darkTheme} from '@theme/dark.json';
import { navigationRef, isMountedRef } from '@routes/outsideRoute';
import store from '@redux/stores';
import Routes from '@routes';

const App = () => {
  const state = store.getState();
  const theme = state.common.theme;

  // Handling Reference Mount
  React.useEffect(() => {
    StatusBar.setHidden(true);
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme === 'dark' ? lightTheme : darkTheme}>
          <NavigationContainer ref={navigationRef}>
            <Routes/>
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </>
  );
};

export default App;
