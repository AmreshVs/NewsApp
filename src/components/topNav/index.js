import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const TopNav = () => {
  const navigation = useNavigation();
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' onPress={() => navigation.goBack()} />
  );
  return (
    <View style={styles.topNavContainer}>
      <TopNavigationAction style={styles.topNav} icon={BackIcon}/>
    </View>
  );
}

export default TopNav;

const styles = StyleSheet.create({
  topNav:{
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  topNavContainer:{
    width: '100%',
    height: 60,
    justifyContent: 'center'
  }
})