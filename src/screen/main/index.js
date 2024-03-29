import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import RNOtpVerify from 'react-native-otp-verify';
import axios from 'axios';

import { setAutoOtpHash } from '@redux/actions/commonActions'
import { setUserData, toggleTheme } from '@redux/actions/commonActions';

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
    const theme = await AsyncStorage.getItem('@ValarTamil:theme');
    if (userData !== null) {
      axios.defaults.headers.common['Authorization'] = JSON.parse(userData).token;
      await props.setUserData(JSON.parse(userData));
      if(theme !== null){
        props.toggleTheme(theme === 'dark' ? true : false);
      }
      props.navigation.navigate('Root');
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
  return bindActionCreators({ setAutoOtpHash: setAutoOtpHash, setUserData: setUserData, toggleTheme: toggleTheme }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);