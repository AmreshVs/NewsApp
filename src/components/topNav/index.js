import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const TopNav = (props) => {

  const styles = StyleSheet.create({
    topNav:{
      paddingHorizontal: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    topNavContainer:{
      width: '100%',
      height: props.small ? 45 : 60,
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
    }
  });

  const navigation = useNavigation();
  const BackIcon = (props) => (
    <Icon {...props} name='arrow-back' onPress={() => navigation.goBack()} />
  );
  return (
    <View style={styles.topNavContainer}>
      <View style={styles.leftContainer}>
        <TopNavigationAction style={styles.topNav} icon={BackIcon}/>
      </View>
      <View style={styles.rightContainer}>
        {props.rightAction !== undefined ? <TopNavigationAction style={styles.topNav} icon={props.rightAction}/> : null}
      </View>
    </View>
  );
}

export default TopNav;