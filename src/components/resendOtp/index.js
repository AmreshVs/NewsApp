import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import CountDown from 'react-native-countdown-component';

import { SEND_OTP } from '@api';
import { useAxios } from '@hooks';
import snackBar from '@common/snackBar';
import Lang from '@lang';

const ResendOtp = (props) => {

  const [resend, setResend] = React.useState(false);

  const handleResendOtp = async () => {
    const response = await useAxios(SEND_OTP, { mobile: props.mobile, autoOtpHash: props.autoOtpHash });
    snackBar(response.message);
    setResend(false);
  }

  return (
    <View style={styles.countDownContainer}>
      {resend === false ?
        <>
          <Text>{Lang('login.resend_in')} </Text>
          <CountDown
            until={60}
            running={!resend}
            onFinish={() => setResend(true)}
            digitStyle={{ backgroundColor: 'transparent' }}
            timeToShow={['S']}
            timeLabels={{ s: '' }}
            size={15}
          />
        </>
        :
        <Button appearance='ghost' onPress={handleResendOtp}>
          {Lang('login.resend_Otp')}
        </Button>
      }
    </View>
  )
}

const mapStateToProps = (state) => state.common;

export default connect(mapStateToProps)(ResendOtp);

const styles = StyleSheet.create({
  countDownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})