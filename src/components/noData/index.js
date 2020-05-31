import React from 'react';
import { Layout, useStyleSheet, StyleService, Text } from '@ui-kitten/components';

const NoData = () => {

  const styles = useStyleSheet(themedStyle);

  return(
    <Layout style={styles.root}>
      <Text>No Data to load</Text>
    </Layout>
  )
}

export default NoData;

const themedStyle = StyleService.create({
  root:{
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})