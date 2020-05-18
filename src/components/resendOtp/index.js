import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import CountDown from 'react-native-countdown-component';

import SendOtp from '@api/sendOtp';
import snackBar from '@common/snackBar';

const ResendOtp = (props) => {
  
  const [resend, setResend] =  React.useState(false);
  
  const handleResendOtp = async () => {
    const response = await SendOtp({mobile: props.mobile, autoOtpHash: props.autoOtpHash});
    snackBar(response.message);
    setResend(false);
  }

  return (
    <View style={styles.countDownContainer}>
      {resend === false ?
        <> 
          <Text>Resend OTP in </Text>
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
            Resend OTP
          </Button>
        }
    </View>
  )
}

const mapStateToProps = (state) => state.common;

export default connect(mapStateToProps)(ResendOtp);

const styles = StyleSheet.create({
  countDownContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})