import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Layout, Tab, TabView, Text } from '@ui-kitten/components';
import { ScrollView } from 'react-native-gesture-handler';

const Test = () => {

  return (
    <ScrollView horizontal={true} style={styles.tabView}>
      <View style={styles.tab}>
        <Text>Check</Text>
      </View>
      <View style={styles.tab}>
        <Text>Check</Text>
      </View>
      <View style={styles.tab}>
        <Text>Check</Text>
      </View>
      <View style={styles.tab}>
        <Text>Check</Text>
      </View>
      <View style={styles.tab}>
        <Text>Check</Text>
      </View>
      <View style={styles.tab}>
        <Text>Check</Text>
      </View>
    </ScrollView>
  );
};

export default Test;

const styles = StyleSheet.create({
  tabContainer: {
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    // backgroundColor: 'red'
  },
  tabView:{
    width: '100%',
    maxHeight: 50,
    // zIndex: 1
  },
  tab:{
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  }
});