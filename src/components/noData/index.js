import React from 'react';
import { Layout, useStyleSheet, StyleService, Text } from '@ui-kitten/components';

import Lang from '@lang';

const NoData = () => {

  const styles = useStyleSheet(themedStyle);

  return(
    <Layout style={styles.root}>
      <Text>{Lang('common.no_data')}</Text>
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