import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const DarwerNav = (props) => {

  const navigation = useNavigation();
  const MenuIcon = (props) => (
    <Icon {...props} style={[props.style, styles.icon]} name='menu-outline' onPress={() => navigation.openDrawer()} />
  );
  return (
    <View style={styles.topNavContainer}>
      <View style={styles.leftContainer}>
        <TopNavigationAction style={styles.topNav} icon={MenuIcon}/>
      </View>
      <View style={styles.rightContainer}>
        {props.rightAction !== undefined ? <TopNavigationAction style={styles.topNav} icon={props.rightAction}/> : null}
      </View>
    </View>
  );
}

export default DarwerNav;

const styles = StyleSheet.create({
  topNav:{
    // paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavContainer:{
    width: '100%',
    height: 50,
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: 'red'
  },
  leftContainer:{
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightContainer:{
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  icon:{
    width: 30,
    height: 30
  }
})