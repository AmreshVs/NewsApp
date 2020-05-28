import React from 'react';
import { StyleSheet } from 'react-native';
import { Spinner, Layout } from '@ui-kitten/components';

const Loader = () => {
  return(
    <Layout style={styles.spinnerContainer}>
      <Spinner/>
    </Layout>
  )
}

export default Loader;

const styles = StyleSheet.create({
  spinnerContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
});