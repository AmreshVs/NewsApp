import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { IconRegistry } from '@ui-kitten/components';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';


import { navigationRef, isMountedRef } from '@routes/outsideRoute';
import store from '@redux/stores';
import Routes from '@routes';

const App = () => {

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
        <NavigationContainer ref={navigationRef}>
          <Routes />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
