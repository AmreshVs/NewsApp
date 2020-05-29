import React from 'react';
import { View, Image } from 'react-native';
import { StyleService, useStyleSheet, Text, Divider, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import VideoPlayer from '@comp/video';

const VideoBig = ({ data, handleFavourite }) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);
  const [videoControl, setVideoControl] = React.useState(false);

  const loadVideo = () => {
    if (videoControl === false) {
      setVideoControl(true);
    }
  }

  const handleNavigation = () => {
    navigation.navigate('NewsDetail', { id: data.id, type: 'videos' });
  }

  const FavouritesIcon = (props) => {
    return(
      <Ripple style={styles.iconContainer} onPress={() => handleFavourite({id: `${data.id}`, type: 'videos'})}>
        <Icon {...props} style={styles.icon} fill={styles.icon.color} name='bookmark' />
      </Ripple>
    )
  }

  return (
    <View style={styles.container} key={data.id}>
      {videoControl === false
        ?
        <>
          <FavouritesIcon/>
          <View style={styles.playContainer}>
            <Icon style={styles.playIcon} fill='#FFF' name='arrow-right' onPress={loadVideo} />
          </View>
          <Image source={{ uri: data.featured_img }} style={styles.video} />
        </>
        :
        <VideoPlayer style={styles.video} url={data.url} featured_img={data.featured_img} playPause={videoControl} inlineOnly />
      }
      <Ripple onPress={handleNavigation}>
        <Text category='p1' style={styles.title}>{data.id + ' ' + data.title}</Text>
      </Ripple>
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
  iconContainer:{
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 99,
    backgroundColor: 'color-basic-800',
    borderRadius: 20,
    padding: 3
  },
  icon: {
    width: 25,
    height: 25,
    color: 'color-basic-100',
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