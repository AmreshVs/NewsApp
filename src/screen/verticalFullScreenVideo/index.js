import React from 'react';
import { StatusBar } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';

import VideoPlayer from '@comp/video';
import themedStyle from './style';

const LiveVideo = ({ route }) => {

  const url = route.params.url;
  const styles = useStyleSheet(themedStyle);

  React.useEffect(() => {
    StatusBar.setHidden(true);
  })

  return (
    <VideoPlayer style={styles.videoPlayer} url={url} playPause={true} fullscreen inlineOnly />
  )
}

export default LiveVideo;