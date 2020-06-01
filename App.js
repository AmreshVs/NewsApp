import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { IconRegistry } from '@ui-kitten/components';
import analytics from '@react-native-firebase/analytics';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef, isMountedRef } from '@routes/outsideRoute';
import store from '@redux/stores';
import Routes from '@routes';
import { NotificationListeners } from '@common/firebaseCommon';

// Gets the current screen from navigation state
const getActiveRouteName = state => {
  const route = state.routes[state.index];

  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }

  return route.name;
};
// cLbnH5WIQo-UB8E5Y9Pwho:APA91bGilnqgV0ZGPiDj-YDjLC2fefhEwSpiRK6Brq45YhTCTLF9gACd4JUmU038NjHvuPcfHA9Blh6sds_RwrvuX2juBBtehrri8lT3OV8I2v96z0JMBONRyV2ESj4i_6riTrz_bJE1
const App = () => {

  const routeNameRef = React.useRef();
  // const navigationRef = React.useRef();

  // Handling Reference Mount
  React.useEffect(() => {
    StatusBar.setHidden(true);
    isMountedRef.current = true;
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);

    NotificationListeners();

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer ref={navigationRef} 
          onStateChange={state => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = getActiveRouteName(state);
            if (previousRouteName !== currentRouteName) {
              analytics().setCurrentScreen(currentRouteName);
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <Routes />
        </NavigationContainer>
      </Provider>
    </>
  );
};

export default App;
