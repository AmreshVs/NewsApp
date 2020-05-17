import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import CountDown from 'react-native-countdown-component';

const ResendOtp = () => {

  const [resend, setResend] =  React.useState(false);

  const handleResendOtp = () => {
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

export default ResendOtp;

const styles = StyleSheet.create({
  countDownContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})