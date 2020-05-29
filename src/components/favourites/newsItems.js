import React from 'react';
import { connect } from 'react-redux';
import { Icon } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

import NewsBig from '@comp/favourites/newsBig';
import PdfSmall from '@comp/favourites/pdfSmall';
import VideoBig from '@comp/favourites/videoBig';
import { useAxios } from '@hooks';
import { ADD_FAVOURITES } from '@api';
import DrawerNav from '@comp/drawerNav';

const NewsItems = ({ item, index, user_id, refresh, pdf }) => {

  const handleFavourite = async (params) => {
    await useAxios(ADD_FAVOURITES, { user_id: user_id, ...params });
    refresh();
  }

  const RenderPdf = () => {
    
    let pdfData = [];
    let lastItem = pdf.length % 2 === 1 ? pdf[pdf.length - 1] : [];

    return(
      // Push two items to array and return it for view like grid. And clear the array for next iteration
      pdf.map((data, index) => {

        if(pdfData.length === 2){
          pdfData = [];
        }

        if(pdfData.length < 2){
          pdfData.push(data);
        }
        
        if(pdfData.length === 2){
          return(
            <View style={styles.pdfContainer}>
              <PdfSmall key={pdfData[0].id} data={pdfData[0]} handleFavourite={handleFavourite} />
              <PdfSmall key={pdfData[1].id} data={pdfData[1]} handleFavourite={handleFavourite} />
            </View>
          )
        }

        if(lastItem !== [] && (pdf.length - 1) === index){
          return(
            <View style={styles.pdfContainer}>
              <PdfSmall key={lastItem.id} data={lastItem} handleFavourite={handleFavourite} />
            </View>
          )
        }
      })
    )
  }

  const Top = () => {

    if (index === 0) {
      const RefreshIcon = (props) => {
        return <Icon {...props} name='sync-outline' onPress={refresh} />
      }
      return (
        <>
          <DrawerNav  rightAction={RefreshIcon}/>
          <View style={styles.heading}>
            <RenderPdf />
          </View>
        </>
      )
    }
    else {
      return null;
    }
  }
  if (item.type === 'news') {
    return (
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
      </>
    )
  }
}

const mapStateToProps = state => state.common.userData;

export default connect(mapStateToProps)(React.memo(NewsItems));

const styles = StyleSheet.create({
  heading: {
    marginBottom: 5
  },
  pdfContainer: {
    flexDirection: 'row',
  },
  pdf:{
    backgroundColor: 'red'
  }
});