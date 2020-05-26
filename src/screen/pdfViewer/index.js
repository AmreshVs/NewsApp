import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

import Pdf from 'react-native-pdf';
import TopNav from '@comp/topNav';

const PDFViewer = () => {

  const route = useRoute();
  const url = route.params.url;

  return (
    <View style={styles.container}>
      <Pdf source={{ uri: url }} style={styles.pdf} />
    </View>
  )
}

export default PDFViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});