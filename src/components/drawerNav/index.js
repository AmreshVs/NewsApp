import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const DarwerNav = (props) => {

  const navigation = useNavigation();

  const MenuIcon = (props) => (
    <Icon {...props} style={[props.style, styles.icon]} name={navigation.openDrawer === undefined ? 'arrow-back-outline' : 'menu-outline'} onPress={() => navigation.openDrawer === undefined ? navigation.goBack() : navigation.openDrawer()} />
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topNavContainer:{
    width: '100%',
    height: 35,
    justifyContent: 'center',
    flexDirection: 'row',
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