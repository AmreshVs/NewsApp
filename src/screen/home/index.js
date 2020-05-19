import React from 'react';
import { Layout, useStyleSheet, Text } from '@ui-kitten/components';

import Statusbar from '@comp/statusbar';
import TopSection from '@comp/home/topSection';
import NewsBig from '@comp/home/newsBig';
import themedStyle from './style';
import { ScrollView } from 'react-native';

const Home = () => {

  const styles = useStyleSheet(themedStyle);

  return(
      <ScrollView>
    <Layout level='2' style={styles.container}>
        <Statusbar/>
        <TopSection/>
        <Text category='h6' style={styles.heading}>Latest News</Text>
        <NewsBig/>
    </Layout>
      </ScrollView>
  )
}

export default Home;