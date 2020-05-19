import React from 'react';
import { StatusBar } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';
import Video from 'react-native-af-video-player'

import themedStyle from './style';

const LiveVideo = ({route}) => {

  const url = route.params.url;
  const styles = useStyleSheet(themedStyle);

  React.useEffect(() => {
    StatusBar.setHidden(true);
  })

  return (
    <Video style={styles.videoPlayer} /*theme={styles.theme}*/ url={url} title='Live' autoPlay hideFullScreenControl={true} />
  )
}

export default LiveVideo;