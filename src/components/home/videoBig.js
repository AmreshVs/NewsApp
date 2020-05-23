import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';
import Video from 'react-native-af-video-player';
import { Viewport } from '@skele/components'

import PostedTime from '@common/postedTime';

const VideoBig = (props) => {

  var videoRef = React.useRef(null);
  const [videoControl, setVideoControl] = React.useState(false);
  const styles = useStyleSheet(themedStyle);

  const ViewportAwareView = Viewport.Aware(View);

  const playVideo = () => {
    if (videoRef.play !== undefined) {
      // setVideoControl(true);
      // videoRef.play();
    }
  }

  const pauseVideo = () => {
    if (videoRef.pause !== undefined) {
      // setVideoControl(false);
      // videoRef.pause();
    }
  }

  return (
    <View style={styles.container}>
      <ViewportAwareView onViewportEnter={playVideo} onViewportLeave={pauseVideo}>
        <Video style={styles.video} ref={(ref) => videoRef = ref} url={props.url} placeholder={props.featured_img} inlineOnly />
      </ViewportAwareView>
      <Text category='p1' style={styles.title}>{props.id + ' ' + props.title}</Text>
      <View style={styles.bottomContainer}>
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} fill={styles.icon.color} name='globe-2-outline' />
          <Text style={styles.caption}>{PostedTime(props.posed_on)}</Text>
        </View>
        <View>
          <Text style={styles.caption}>12 Comments</Text>
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
  }
});