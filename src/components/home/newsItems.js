import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import NewsBig from '@comp/home/newsBig';
import NewsSmall from '@comp/home/newsSmall';
import VideoBig from '@comp/home/videoBig';
import TopSection from '@comp/home/topSection';
import TodayPdf from '@comp/home/todayPdf';
import Lang from '@lang';
import DrawerNav from '@comp/drawerNav';

const NewsItems = ({ item, index }) => {

  const Top = () => {
    if (index === 0) {

      const navigation = useNavigation();
      const NotificationIcon = (props) => {
        return <Icon {...props} name='bell-outline' onPress={() => navigation.navigate('Notifications')} />
      }

      const [live, setLive] = React.useState('');

      const handleLive = (data) => {
        setLive(data);
      }

      return (
        <>
          <DrawerNav rightAction={NotificationIcon} />
          <TopSection live={live} />
          <TodayPdf handleLive={handleLive} />
          <Text category='h6' style={styles.heading}>{Lang('home.latest_news')}</Text>
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
        <NewsBig key={item.id} data={item} />
      </>
      :
      <>
        <Top />
        <NewsSmall key={item.id} data={item} />
      </>
  }
  else {
    return (
      <>
        <Top />
        <VideoBig key={item.id} data={item} />
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