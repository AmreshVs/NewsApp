import React from 'react';
import { Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

import NewsBig from '@comp/home/newsBig';
import NewsSmall from '@comp/home/newsSmall';
import VideoBig from '@comp/home/videoBig';
import Statusbar from '@comp/statusbar';
import TopSection from '@comp/home/topSection';
import TodayPdf from '@comp/home/todayPdf';

const NewsItems = ({ item, index }) => {

  const Top = () => {
    if (index === 0) {
      return (
        <>
          <Statusbar />
          <TopSection />
          <TodayPdf />
          <Text category='h6' style={styles.heading}>Latest News</Text>
        </>
      )
    }
    else {
      return null;
    }
  }
  if (item.type === 'news') {
    return index % 4 === 0
      ?
      <>
        <Top />
        <NewsBig key={item.id} id={item.id} title={item.title} featured_img={item.featured_img} posted_on={item.posted_on} />
      </>
      :
      <>
        <Top />
        <NewsSmall key={item.id} id={item.id} title={item.title} featured_img={item.featured_img} posted_on={item.posted_on} />
      </>
  }
  else {
    return (
      <>
        <Top />
        <VideoBig key={item.id} id={item.id} title={item.title} url={item.url} featured_img={item.featured_img} posted_on={item.posted_on} />
      </>
    )
  }
}

export default React.memo(NewsItems);

const styles = StyleSheet.create({
  heading: {
    marginBottom: 5
  }
});