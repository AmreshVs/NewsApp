import React from 'react';
import { Button, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';

const Main = ({ navigation }) => {

  React.useLayoutEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    const userData = await AsyncStorage.getItem('@ValarTamil:userData');
    if (userData !== null) {
      // navigation.navigate('Home');
    }
    else {
      navigation.navigate('Login');
    }
  }

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginVertical: 4 }} onPress={() => navigation.navigate('Login')}>Login</Button>
        <Button style={{ marginVertical: 4 }}>TOGGLE THEME</Button>
      </Layout>
    </>
  );
};

export default Main;