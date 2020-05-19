import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import RNOtpVerify from 'react-native-otp-verify';

import { setAutoOtpHash } from '@redux/actions/commonActions'

const Main = (props) => {
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
      props.navigation.navigate('Home');
    }
    else {
      props.navigation.navigate('Login');
    }
  }

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 150, height: 150}} source={require('../../img/logo.png')} />
      </Layout>
    </>
  );
};

const mapStateToProps = (state) => state.common;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setAutoOtpHash: setAutoOtpHash }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);