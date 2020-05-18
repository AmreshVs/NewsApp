import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const TopNav = () => {
  const navigation = useNavigation();
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' onPress={() => navigation.goBack()} />
  );
  return (
    <TopNavigationAction style={styles.topNav} icon={BackIcon}/>
  );
}

export default TopNav;

const styles = StyleSheet.create({
  topNav:{
    height: '10%',
    justifyContent: 'center',
    paddingHorizontal: 10
  }
})