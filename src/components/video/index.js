import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, StatusBar, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';
import { Spinner } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

import { FullscreenClose, FullscreenOpen } from './icons';
import { PlayerControls } from './PlayerControls';
import { ProgressBar } from './ProgressBar';

const VideoPlayer = (props) => {

  let videoRef = React.useRef();
  const [state, setState] = useState({
    fullscreen: props.fullscreen || false,
    play: props.playPause,
    currentTime: 0,
    duration: 0,
    showControls: true,
    loading: true
  });

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={showControls}>
        <View>
          <Video
            ref={videoRef}
            source={{
              uri:
                props.url,
            }}
            style={!state.fullscreen ? [styles.inlineVideo, props.style] : styles.fullscreenVideo}
            controls={false}
            resizeMode={'contain'}
            poster={props.featured_img}
            posterResizeMode='cover'
            onLoad={onLoadEnd}
            onProgress={onProgress}
            onEnd={onEnd}
            paused={!state.play}
          />
          {state.showControls && (
            <View style={styles.controlOverlay}>
              {state.loading === true 
                ? 
                  <View style={styles.loaderContainer}>
                    <Spinner status='basic'/>
                  </View>
                :
                  <>
                    <Ripple
                      onPress={!props.inlineOnly ? handleFullscreen : null}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      style={styles.fullscreenButton}>
                      {!props.inlineOnly ? state.fullscreen ? <FullscreenClose /> : <FullscreenOpen /> : null}
                    </Ripple>
                    <PlayerControls
                      onPlay={handlePlayPause}
                      onPause={handlePlayPause}
                      playing={state.play}
                      showPreviousAndNext={false}
                      showSkip={true}
                      skipBackwards={skipBackward}
                      skipForwards={skipForward}
                    />
                    <ProgressBar
                      fullscreen={props.fullscreen || false}
                      currentTime={state.currentTime}
                      duration={state.duration > 0 ? state.duration : 0}
                      onSlideStart={handlePlayPause}
                      onSlideComplete={handlePlayPause}
                      onSlideCapture={onSeek}
                    />
                  </>
              }
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );

  function handleOrientation(orientation) {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setState(s => ({ ...s, fullscreen: true })), StatusBar.setHidden(true))
      : (setState(s => ({ ...s, fullscreen: false })),
        StatusBar.setHidden(false));
  }

  function handleFullscreen() {
    setState({ ...state, fullscreen : !state.fullscreen });
    state.fullscreen ? Orientation.unlockAllOrientations() : Orientation.lockToLandscape();
  }

  function handlePlayPause() {
    // If playing, pause and show controls immediately.
    if (state.play) {
      setState({ ...state, play: false, showControls: true });
      setTimeout(() => setState(s => ({ ...s, showControls: false })), 2000);
      return;
    }

    setState({ ...state, play: true });
    setTimeout(() => setState(s => ({ ...s, showControls: false })), 2000);
  }

  function skipBackward() {
    videoRef.current.seek(state.currentTime - 15);
    setState({ ...state, currentTime: state.currentTime - 15 });
  }

  function skipForward() {
    videoRef.current.seek(state.currentTime + 15);
    setState({ ...state, currentTime: state.currentTime + 15 });
  }

  function onSeek(data) {
    videoRef.current.seek(data.seekTime);
    setState({ ...state, currentTime: data.seekTime });
  }

  function onLoadEnd(data) {
    setState(s => ({
      ...s,
      duration: data.duration,
      currentTime: data.currentTime,
      loading: false
    }));
    setTimeout(() => setState(s => ({ ...s, showControls: false })), 2000);
  }

  function onProgress(data) {
    setState(s => ({
      ...s,
      currentTime: data.currentTime,
    }));
  }

  function onEnd() {
    setState({ ...state, play: false });
    videoRef.current.seek(0);
  }

  function showControls() {
    state.showControls
      ? setState({ ...state, showControls: false })
      : setState({ ...state, showControls: true });
    if(state.showControls){
      setTimeout(() => setState({ ...state, showControls: false }), 2000);
    }
  }

};

export default React.memo(VideoPlayer);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  inlineVideo: {
    height: Dimensions.get('window').width * (9 / 16),
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
  },
  video: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  fullscreenVideo: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  },
  text: {
    marginTop: 30,
    marginHorizontal: 20,
    fontSize: 15,
    textAlign: 'justify',
  },
  fullscreenButton: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    paddingRight: 10,
  },
  controlOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1e85',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  loaderContainer:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
