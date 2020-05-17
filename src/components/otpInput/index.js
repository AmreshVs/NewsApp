import React from 'react';
import { View } from 'react-native';
import { Input, StyleService, useStyleSheet } from '@ui-kitten/components';
import RNOtpVerify from 'react-native-otp-verify';

const OtpInput = (props) => {

  React.useEffect(() => {
    RNOtpVerify.getOtp()
      .then(() => {
        RNOtpVerify.addListener((message) => {
          try{
            if(message){
              const messageWithOtp = message.split(' ');
              const otp = (messageWithOtp[1].split(' ')[0]).split('');
              if(otp.length === 4){
                props.setAutoOtp(otp);
              }
            }
          }
          catch(error){
            console.log('error', error);
          }
        })
      })
      .catch((error) => {
        console.log(error);
      })

      return () => {
        RNOtpVerify.removeListener();
      }
  }, [])

  const input1 = React.useRef(null);
  const input2 = React.useRef(null);
  const input3 = React.useRef(null);
  const input4 = React.useRef(null);
  const styles = useStyleSheet(themedStyle);

  const handleInput = (e, id) => {
    if(e.nativeEvent.text !== ''){
      if(id !== 4){
        let inputRef = eval('input' + (id + 1 ));
        inputRef.current.focus();
      }
    }
    else{
      if(id !== 1){
        let inputRef = eval('input' + (id - 1 ));
        inputRef.current.focus();
      }
    }
  }

  const handleInputText = (text, id) => {
    props.setOtp(id, text);
  }

  return(
    <View style={styles.container}>
      <Input style={styles.input} value={props.value.input1} placeholder='0' keyboardType='number-pad' ref={input1} maxLength={1} onChange={(e) => handleInput(e, 1)} onChangeText={(text) => handleInputText(text, 1)} size="large" disabled={props.disabled} />
      <Input style={styles.input} value={props.value.input2} placeholder='0' keyboardType='number-pad' ref={input2} maxLength={1} onChange={(e) => handleInput(e, 2)} onChangeText={(text) => handleInputText(text, 2)} size="large" disabled={props.disabled} />
      <Input style={styles.input} value={props.value.input3} placeholder='0' keyboardType='number-pad' ref={input3} maxLength={1} onChange={(e) => handleInput(e, 3)} onChangeText={(text) => handleInputText(text, 3)} size="large" disabled={props.disabled} />
      <Input style={styles.input} value={props.value.input4} placeholder='0' keyboardType='number-pad' ref={input4} maxLength={1} onChange={(e) => handleInput(e, 4)} onChangeText={(text) => handleInputText(text, 4)} size="large" disabled={props.disabled} />
    </View>
  )
}

export default OtpInput;

const themedStyle = StyleService.create({
  container:{
    width: '100%',
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input:{
    width: 50,
    marginHorizontal: 10,
  },
});