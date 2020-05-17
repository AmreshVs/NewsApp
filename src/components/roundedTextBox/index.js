import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';

const RoundedTextBox = (props) => {
  
  const icon = props.icon;
  
  const renderIcon = (props) => {
    return(
      <Icon {...props} name={icon} />
    );
  }

  return(
    <Input style={styles.input} value={props.value} onChangeText={props.onChangeText} size={props.size} placeholder={props.placeholder} keyboardType={props.keyboardType} accessoryLeft={props.accessory === 'left' ? renderIcon : null} accessoryRight={props.accessory === 'right' ? renderIcon : null} />    
  )
}

export default RoundedTextBox;

const styles = StyleSheet.create({
  input:{
    borderRadius: 30
  },
})