import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Layout, Text } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import RNOtpVerify from 'react-native-otp-verify';

import { setAutoOtpHash } from '@redux/actions/commonActions'

const Main = (props) => {
console.log(props);
  React.useEffect(() => {
    RNOtpVerify.getHash()
    .then((hash) => {
      props.setAutoOtpHash(hash[0]);
    })
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    const userData = await AsyncStorage.getItem('@ValarTamil:userData');
    if (userData !== null) {
      // props.navigation.navigate('Home');
    }
    else {
      props.navigation.navigate('Login');
    }
  }

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button style={{ marginVertical: 4 }} onPress={() => props.navigation.navigate('Login')}>Login</Button>
        <Button style={{ marginVertical: 4 }} onPress={() => props.navigation.navigate('Signup')}>Signup</Button>
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => state.common;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setAutoOtpHash: setAutoOtpHash }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);