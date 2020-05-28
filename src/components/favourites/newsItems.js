import React from 'react';
import { connect } from 'react-redux';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import NewsBig from '@comp/favourites/newsBig';
import PdfSmall from '@comp/favourites/pdfSmall';
import VideoBig from '@comp/favourites/videoBig';
import Lang from '@lang';
import { useAxios } from '@hooks';
import { ADD_FAVOURITES } from '@api';

const NewsItems = ({ item, index, user_id, refresh }) => {

  const handleFavourite = async (params) => {
    await useAxios(ADD_FAVOURITES, { user_id: user_id, ...params });
    refresh();
  }

  const Top = () => {
    if (index === 0) {
      return (
        <>
          <Text category='h6' style={styles.heading}>{Lang('home.latest_news')}</Text>
        </>
      )
    }
    else {
      return null;
    }
  }
  if (item.type === 'news') {
    return(
      <>
        <Top />
        <NewsBig key={item.id} data={item} handleFavourite={handleFavourite} />
      </>
    )
  }
  else if (item.type == 'video') {
    return (
      <>
        <Top />
        <VideoBig key={item.id} data={item} handleFavourite={handleFavourite} />
      </>
    )
  }
  else{
    return (
      <>
        <Top />
        <PdfSmall key={item.id} data={item} handleFavourite={handleFavourite} />
      </>
    )
  }
}

const mapStateToProps = state => state.common.userData;

export default connect(mapStateToProps)(React.memo(NewsItems));

const styles = StyleSheet.create({
  heading: {
    marginBottom: 5
  }
});