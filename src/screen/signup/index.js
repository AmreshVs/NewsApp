import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, useStyleSheet, Button, Spinner, Icon } from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

import StatusBar from '@comp/statusbar';
import Lang from '@lang'
import themedStyle from './style';
import RoundedTextBox from '@comp/roundedTextBox';
import snackBar from '@common/snackBar';
import mobileValidation from '@common/mobileValidation';
import LoginApi from '@api/login';
import * as CityStates from '@const/cityState.json';

const Signup = ({ navigation }) => {

  let SelectData = CityStates.default;
  const styles = useStyleSheet(themedStyle);
  const [mobile, setMobile] = React.useState('+918675529268');
  const [loading, setLoading] = React.useState(false);
  const [cityState, setCityState] = React.useState(null);
  const [cityStateData, setCityStateData] = React.useState(SelectData);

  const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());

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

  const onSelect = (index) => {
    setCityState(SelectData[index].title);
  };

  const onChangeText = (query) => {
    setCityState(query);
    setCityStateData(SelectData.filter(item => filter(item, query)));
  };

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
    <Layout level='1' style={styles.root}>
        <StatusBar />
      {/* <KeyboardAvoidingView enabled={false} behavior="padding"> */}
        <Text category='h2'>{Lang('signup.heading')}</Text>
        <Text appearance='hint'>{Lang('signup.caption')}</Text>
        <View style={styles.inputContainer}>
          <RoundedTextBox size='large' value={mobile} onChangeText={handleMobileText} placeholder={Lang('signup.name')} accessory='left' icon='person-outline' />
          <Autocomplete style={styles.cityState} size="large"  placeholder='City & State' value={cityState} onSelect={onSelect} onChangeText={onChangeText} accessoryLeft={renderIcon}>
            {cityStateData.map(renderOption)}
          </Autocomplete>
          <RoundedTextBox size='large' value={mobile} onChangeText={handleMobileText} placeholder={Lang('login.mobile_number')} keyboardType='phone-pad' accessory='left' icon='smartphone-outline' />
          <Button style={styles.button} appearance='filled' disabled={mobile.length >= 10 ? false : true} accessoryLeft={loading === true ? LoadingIndicator : null}>
            {Lang('login.signup')}
          </Button>
        </View>
    {/* </KeyboardAvoidingView> */}
        <View style={styles.signinContainer}>
          <Text>{Lang('login.no_account')} </Text>
          <Text style={styles.signinText} status='primary' onPress={() => navigation.navigate('Login')}>
            {Lang('login.signup')}
          </Text>
        </View>
      </Layout>
  )
}

export default Signup;