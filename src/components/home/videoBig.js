import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';
import VideoPlayer from '@comp/video';

import PostedTime from '@common/postedTime';

const VideoBig = ({data}) => {

  const [videoControl, setVideoControl] = React.useState(false);
  const styles = useStyleSheet(themedStyle);

  const loadVideo = () => {
    if (videoControl === false) {
      setVideoControl(true);
    }
  }

  return (
    <View style={styles.container} key={data.id}>
      {videoControl === false
        ?
        <>
          <View style={styles.playContainer}>
            <Icon style={styles.playIcon} fill='#FFF' name='arrow-right' onPress={loadVideo} />
          </View>
          <Image source={{ uri: data.featured_img }} style={styles.video} />
        </>
        :
        <VideoPlayer style={styles.video} url={data.url} featured_img={data.featured_img} playPause={videoControl} inlineOnly />
      }
      <Text category='p1' style={styles.title}>{data.id + ' ' + data.title}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} fill={styles.icon.color} name='globe-2-outline' />
          <Text style={styles.caption}>{PostedTime(data.posted_on)}</Text>
        </View>
        <View>
          <Text style={styles.caption}>{data.comments} Comments</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
    </View>
  )
}

export default VideoBig;

const themedStyle = StyleService.create({
  video: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    overflow: 'hidden'
  },
  title: {
    paddingTop: 5,
    marginBottom: 10
  },
  container: {
  },
  caption: {
    color: 'color-basic-600'
  },
  icon: {
    width: 17,
    height: 17,
    color: 'color-basic-600',
    marginRight: 5
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: 15,
    marginBottom: 15
  },
  playIcon: {
    width: 30,
    height: 30,
    padding: 20
  },
  playContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  }
});