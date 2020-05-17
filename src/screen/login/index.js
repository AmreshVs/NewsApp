import React from 'react';
import { Image, View } from 'react-native';
import { Layout, Text, useStyleSheet, Button, Spinner } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';

import StatusBar from '@comp/statusbar';
import OtpInput from '@comp/otpInput';
import ResendOtp from '@comp/resendOtp'
import Lang from '@lang'
import themedStyle from './style';
import RoundedTextBox from '@comp/roundedTextBox';
import snackBar from '@common/snackBar';
import mobileValidation from '@common/mobileValidation';
import LoginApi from '@api/login';

const Login = ({navigation}) => {
  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });
  const [mobile, setMobile] = React.useState('+918675529268');
  const [loading, setLoading] = React.useState(false);
  const [otpClick, setOtpClick] = React.useState(false);

  const handleOtpSend = async () => {
    if(mobileValidation(mobile)){
      setLoading(true);
      let otp = Number(state.input1 + state.input2 + state.input3 + state.input4);
      let response = otp.toString().length > 0 ? await LoginApi({mobile: mobile, otp: otp}) : await LoginApi({mobile: mobile});
      setLoading(false);
      setOtpClick(true);
      if(response.message !== 'Login Success'){
        snackBar(response.message);  
      }
      if(response.message === 'Login Success'){
        await AsyncStorage.setItem('@ValarTamil:userData', JSON.stringify(response.data));
        setMobile('');
        setState({input1: '',input2: '',input3: '',input4: ''});
      }
      if(otp.toString().length > 0 && response.message === 'Login Success'){
        navigation.navigate('Main');
      }
    }
  }

  const handleAutoOtp = (otp) => {
    setState({ input1: otp[0], input2: otp[1], input3: otp[2], input4: otp[3] });
  }

  const handleSetOtp = (id, text) => {
    setState({ ...state, ['input' + id]: text});
  }

  const handleMobileText = (text) => {
    if(text.length === 1 && !text.includes('+')){
      setMobile('+91' + text);
    }
    else if(mobile.length < 10 && otpClick === true){
      setOtpClick(false);
    }
    else{
      setMobile(text);
    }
  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status='basic' size='small'/>
    </View>
  );

  return (
    <Layout level='1' style={styles.root}>
      <StatusBar />
      <Image style={styles.logo} source={require('../../img/logo.png')} />
      <Text category='h2'>{Lang('login.welcome_back')}</Text>
      <Text appearance='hint'>{Lang('login.caption')}</Text>
      <View style={styles.inputContainer}>
        <RoundedTextBox size='large' value={mobile} onChangeText={handleMobileText} placeholder={Lang('login.mobile_number')} keyboardType='phone-pad' accessory='left' icon='smartphone-outline' />
        {otpClick ? 
          <>
            <OtpInput value={state} setAutoOtp={handleAutoOtp} setOtp={handleSetOtp} disabled={!otpClick} />
            <ResendOtp/> 
          </>
        : null}
        <Button style={[styles.button, {marginTop: !otpClick ? 20 : 5}]} appearance='filled' onPress={handleOtpSend} disabled={mobile.length >= 10 ? false : true} accessoryLeft={loading === true ? LoadingIndicator : null}>
          {!otpClick ? Lang('login.get_otp') : Lang('login.login')}
        </Button>
      </View>
      <View style={styles.signupContainer}>
        <Text>{Lang('login.no_account')} </Text>
        <Text style={styles.signupText} status='primary' onPress={() => navigation.navigate('Signup')}>
          {Lang('login.signup')}
        </Text>
      </View>
    </Layout>
  )
}

export default Login;