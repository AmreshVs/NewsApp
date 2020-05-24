import React from 'react';
import {View, StyleSheet} from 'react-native';
import { VideoSkipBack, VideoPrevious, VideoPause, VideoPlay, VideoNext, VideoSkipForward } from './icons';
import Ripple from 'react-native-material-ripple';

export const PlayerControls = ({
  playing,
  showPreviousAndNext,
  showSkip,
  previousDisabled,
  nextDisabled,
  onPlay,
  onPause,
  skipForwards,
  skipBackwards,
  onNext,
  onPrevious,
}) => (
  <View style={styles.wrapper}>
    {showPreviousAndNext && (
      <Ripple
        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
        onPress={onPrevious}
        disabled={previousDisabled}>
        <VideoPrevious />
      </Ripple>
    )}

    {showSkip && (
      <Ripple style={styles.touchable} onPress={skipBackwards}>
        <VideoSkipBack />
      </Ripple>
    )}

    <Ripple
      style={styles.touchable}
      onPress={playing ? onPause : onPlay}>
      {playing ? <VideoPause /> : <VideoPlay />}
    </Ripple>

    {showSkip && (
      <Ripple style={styles.touchable} onPress={skipForwards}>
        <VideoSkipForward />
      </Ripple>
    )}

    {showPreviousAndNext && (
      <Ripple
        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
        onPress={onNext}
        disabled={nextDisabled}>
        <VideoNext />
      </Ripple>
    )}
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 3,
  },
  touchable: {
    padding: 5,
  },
  touchableDisabled: {
    opacity: 0.3,
  },
});
