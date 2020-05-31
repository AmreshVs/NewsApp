import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { IconRegistry } from '@ui-kitten/components';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';

import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';


import { navigationRef, isMountedRef } from '@routes/outsideRoute';
import store from '@redux/stores';
import Routes from '@routes';

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
    getToken();
    return () => (isMountedRef.current = false);
  }, []);

  const getToken = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
    console.log(await messaging().getToken());
  }

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
    
            // Save the current route name for later comparision
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
