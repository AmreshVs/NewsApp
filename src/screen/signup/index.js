import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image } from 'react-native';
import { Layout, Text, useStyleSheet, Button, Spinner, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import axios from 'axios';

import Lang from '@lang'
import themedStyle from './style';
import OtpInput from '@comp/otpInput';
import ResendOtp from '@comp/resendOtp'
import RoundedTextBox from '@comp/roundedTextBox';
import snackBar from '@common/snackBar';
import mobileValidation from '@common/mobileValidation';
import { SIGNUP } from '@api';
import { useAxios } from '@hooks';
import { CityStateData } from '@const/cityState';
import TopNav from '@comp/topNav';
import { setUserData } from '@redux/actions/commonActions';
import { getToken } from '@common/firebaseCommon';

const Signup = (props) => {

  const styles = useStyleSheet(themedStyle);
  const [state, setState] = React.useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });
  const [mobile, setMobile] = React.useState('');
  const [fullname, setFullname] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [otpClick, setOtpClick] = React.useState(false);
  const [cityState, setCityState] = React.useState('');
  const [cityStateData, setCityStateData] = React.useState(CityStateData);

  const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
      <Spinner status='basic' size='small' />
    </View>
  );

  const handleMobileText = (text) => {
    if (text.length === 1 && !text.includes('+')) {
      setMobile('+91' + text);
    }
    else {
      setMobile(text);
    }
  }

  // Filter to get the typed City and State
  const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

  // Set the filtered and Selected Item
  const onSelect = (index) => {
    setCityState(cityStateData[index].title);
  };

  // Search on the data for City and State on Every type
  const onChangeText = (query) => {
    setCityState(query);
    setCityStateData(cityStateData.filter(item => filter(item, query)));
  };

  // If OTP auto received the value will be filled automatically
  const handleAutoOtp = (otp) => {
    setState({ input1: otp[0], input2: otp[1], input3: otp[2], input4: otp[3] });
  }

  // Set the OTP value on input based on id
  const handleSetOtp = (id, text) => {
    setState({ ...state, ['input' + id]: text });
  }

  // Check for OTP not empty
  const validateOtp = () => {
    let otp = `${state.input1}${state.input2}${state.input3}${state.input4}`;
    if (otpClick && otp.length < 4) {
      snackBar(Lang('signup.enterOtp'));
      return false;
    }
    return true;
  }

  // Flag to disable on enable the Signup button
  const signupDisable = fullname.length < 5 ? true : cityState.length < 5 ? true : mobile.length < 5 ? true : false;

  const handleSignup = async () => {
    // Check if the City and State if present on the data
    const checkInCityState = cityStateData.find(({ title }) => title === cityState);
    if (checkInCityState === undefined) {
      snackBar('signup.cityStateNoMatch');
    }
    // Validate Mobile number and Entered City State
    var otp = `${state.input1}${state.input2}${state.input3}${state.input4}`;
    if (mobileValidation(mobile) && checkInCityState !== undefined) {
      if (validateOtp() === true) {
        setLoading(true);
        // API call based on OTP and Non OTP
        const response = otp.length > 0 ? await useAxios(SIGNUP, { fullname: fullname, citystate: cityState, mobile: mobile, otp: otp, notification_token: await getToken() }) : await useAxios(SIGNUP, { fullname: fullname, citystate: cityState, mobile: mobile, autoOtpHash: props.autoOtpHash });
        setOtpClick(true);
        snackBar(response.message);
        setLoading(false);
        if(response.message === 'You are already Valar Tamil user, Please Signin'){
          props.navigation.navigate('Login');
        }
        // After Signup Save the Data with token
        if (response.message === 'Signup Success') {
          await props.setUserData(response.data);
          await AsyncStorage.setItem('@ValarTamil:userData', JSON.stringify(response.data));
          axios.defaults.headers.common['Authorization'] = response.data.token;
        }
        if (otp.length > 0 && response.message === 'Signup Success') {
          props.navigation.navigate('Main');
        }
      }
    }
  }

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  const renderIcon = (props) => {
    return (
      <Icon {...props} name={'briefcase-outline'} />
    );
  }

  return (
    <Layout level='1' style={styles.layout}>
      {/* <StatusBar /> */}
      <TopNav/>
      <View style={styles.root}>
        <Image style={styles.logo} source={require('../../img/logo.png')} />
        <Text category='h2'>{Lang('signup.heading')}</Text>
        <Text appearance='hint'>{Lang('signup.caption')}</Text>
        <View style={styles.inputContainer}>
          {/* Username */}
          <RoundedTextBox size='large' value={fullname} onChangeText={(text) => setFullname(text)} placeholder={Lang('signup.fullname')} accessory='left' icon='person-outline' />
          {/* City and State */}
          <Autocomplete style={styles.cityState} size="large" placeholder='City & State' placement="top" value={cityState} onSelect={onSelect} onChangeText={onChangeText} accessoryLeft={renderIcon}>
            {cityStateData.map(renderOption)}
          </Autocomplete>
          {/* OTP Input */}
          <RoundedTextBox size='large' value={mobile} onChangeText={handleMobileText} placeholder={Lang('login.mobile_number')} keyboardType='phone-pad' accessory='left' icon='smartphone-outline' />
          {otpClick ?
            <>
              <OtpInput value={state} setAutoOtp={handleAutoOtp} setOtp={handleSetOtp} disabled={!otpClick} />
              <ResendOtp mobile={mobile} />
            </>
          : null}
          {/* Get OTP and Sign Up Button */}
          <Button style={styles.button} appearance='filled' disabled={signupDisable} onPress={handleSignup} accessoryLeft={loading === true ? LoadingIndicator : null}>
            {!otpClick ? Lang('login.get_otp') : Lang('login.signup')}
          </Button>
        </View>
        <View style={styles.signinContainer}>
          <Text>{Lang('signup.have_account')} </Text>
          <Text style={styles.signinText} status='primary' onPress={() => props.navigation.navigate('Login')}>
            {Lang('login.login')}
          </Text>
        </View>
      </View>
    </Layout>
  )
}

const mapStateToProps = (state) => state.common;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setUserData: setUserData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);