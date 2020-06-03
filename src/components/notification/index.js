import React from 'react';
import { View, Image } from 'react-native';
import { Text, useStyleSheet, StyleService, Divider } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

import PostedTime from '@common/postedTime';
import { VIEW_NOTIFICATION } from '@api';
import { useAxios } from '@hooks';
import { handleNotification } from '@common/firebaseCommon';

const Notification = ({ notification }) => {

  const styles = useStyleSheet(themedStyle);

  const handleNotificationView = async () => {
    await useAxios({...VIEW_NOTIFICATION, url: `${VIEW_NOTIFICATION.url}?id=${notification.id}`});
    handleNotification(notification.data);
  } 

  return (
    <>
      <Ripple style={notification.notify_viewed === true ? styles.containerViewed : styles.container} onPress={handleNotificationView}>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{uri: notification.image }} />
        </View>
        <View style={styles.contentContainer}>
          <Text>{notification.title}</Text>
          <Text style={styles.posted_on}>{PostedTime(notification.posted_on)}</Text>
        </View>
      </Ripple>
      <Divider style={styles.divider} />
    </>
  )
}

export default Notification;

const themedStyle = StyleService.create({
  container:{
    flexDirection: 'row',
    padding: 5,
    borderRadius: 10
  },
  containerViewed:{
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'background-basic-color-3',
    borderRadius: 10
  },
  imgContainer:{
    width: '30%',
  },
  contentContainer: {
    width: '70%',
    paddingLeft: 5,
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10
  },
  posted_on: {
    color: 'color-basic-600'
  },
  divider:{
    marginVertical: 5,
  }
})