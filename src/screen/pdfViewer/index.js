import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Spinner, Layout } from '@ui-kitten/components';
import Pdf from 'react-native-pdf';

const PDFViewer = () => {

  const route = useRoute();
  const url = route.params.url;

  return (
    <Layout style={styles.container}>
      <Pdf source={{ uri: url }} style={styles.pdf} activityIndicator={<Spinner/>} />
    </Layout>
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