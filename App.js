import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { mapping } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeContext } from './src/theme/themeContext';

import { default as lightTheme } from './src/theme/light.json';
import {default as darkTheme} from './src/theme/dark.json';
import store from './src/redux/stores/store';
import Routes from './src/routes/index';

const App = () => {

  const [theme, setTheme] = React.useState(lightTheme);

  const toggleTheme = () => {
    const nextTheme = theme === lightTheme ? darkTheme : lightTheme;
    setTheme(nextTheme);
  };

  return (
    <>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ApplicationProvider mapping={mapping} theme={theme}>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" />
              <Routes/>
            </NavigationContainer>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </Provider>
    </>
  );
};

export default App;
