import React from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Spinner, Layout, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import Pdf from 'react-native-pdf';
import Ripple from 'react-native-material-ripple';

import { useAxios } from '@hooks';
import { GET_USER_PDF, ADD_FAVOURITES } from '@api';

const PDFViewer = ({ user_id }) => {

  const styles = useStyleSheet(themedStyle);
  const route = useRoute();
  const url = route.params.url;
  const id = route.params.id;

  const [favourite, setFavourite] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await useAxios({ ...GET_USER_PDF, url: `${GET_USER_PDF.url}?id=${id}` });
    setFavourite(response.data.is_favourite);
  }

  const handleFavourite = async () => {
    await useAxios(ADD_FAVOURITES, { user_id: user_id, id: `${id}`, type: 'pdfs' });
    setFavourite(!favourite);
  }

  return (
    <Layout style={styles.container}>
      <Ripple style={styles.iconContainer} onPress={handleFavourite}>
        <Icon style={styles.icon} fill={styles.icon.color} name={favourite === true ? 'bookmark' : 'bookmark-outline' } />
      </Ripple>
      <Pdf source={{ uri: url }} style={styles.pdf} activityIndicator={<Spinner/>} />
    </Layout>
  )
}

const mapStateToProps = state => state.common.userData;

export default connect(mapStateToProps)(PDFViewer);

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  iconContainer:{
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: 'color-basic-800',
    borderRadius: 20,
    padding: 3
  },
  icon: {
    width: 25,
    height: 25,
    color: 'color-basic-100',
  },
});