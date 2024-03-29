import React from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { useStyleSheet, StyleService, Icon, Text } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/core';

import Lang from '@lang';

const TopSection = ({ theme, live }) => {
  
  const styles = useStyleSheet(themedStyle);
  const navigation = useNavigation();

  const handleVideo = () => {
    navigation.navigate('VerticalFullScreenVideo', { url: live })
  }

  return (
    <View style={styles.header}>
      <Ripple style={styles.col1} onPress={handleVideo}>
        <Text category='label' style={styles.live}>{Lang('home.live')}</Text>
        <View style={styles.iconContainer}>
          <Icon style={styles.icon} name='arrow-right' fill={styles.iconColor.color} />
        </View>
        <Image style={styles.videoThumb} source={{ uri: 'https://embedwistia-a.akamaihd.net/deliveries/d9a36bc6ec0f34ae59a48f6082c5351d908a341d.webp?image_crop_resized=1078x1980' }} />
      </Ripple>
      <View style={styles.col2}>
        <Image style={styles.logo} source={theme === 'dark' ? require('../../img/vt_logo_light.png') : require('../../img/vt_logo.png')} />
        <Ripple style={styles.brandLogoContainer} onPress={() => navigation.navigate('NewsWithCategory', { brand_id: 3 })}>
          <Image style={styles.brandLogo} source={theme === 'dark' ? require('../../img/agri_logo_light.png') : require('../../img/agri_logo.png')} />
        </Ripple>
        <Ripple style={styles.brandLogoContainer} onPress={() => navigation.navigate('NewsWithCategory', { brand_id: 1 })}>
          <Image style={styles.brandLogo} source={require('../../img/kaalaimani_logo.png')} />
        </Ripple>
        <Ripple style={styles.brandLogoContainer} onPress={() => navigation.navigate('NewsWithCategory', { brand_id: 4 })}>
          <Image style={styles.brandLogo} source={require('../../img/myhome_logo.png')} />
        </Ripple>
        <Ripple style={styles.brandLogoContainer} onPress={() => navigation.navigate('NewsWithCategory', { brand_id: 5 })}>
          <Image style={styles.brandLogo} source={theme === 'dark' ? require('../../img/holidaynews_logo_light.png') : require('../../img/holidaynews_logo.png')} />
        </Ripple>
      </View>
    </View>
  )
}

const mapStateToProps = state => state.common;

export default connect(mapStateToProps)(TopSection);

const themedStyle = StyleService.create({
  header:{
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5
  },
  col1:{
    width: '50%',
    paddingRight: 5,
    position: 'relative'
  },
  col2:{
    width: '50%',
    alignItems: 'center',
    paddingLeft: 5
  },
  logo:{
    width: 130,
    height: 130,
    resizeMode: 'contain'
  },
  videoThumb:{
    width: '100%',
    height: 350,
    borderRadius: 10,
    zIndex: 0
  },
  brandLogo:{
    width: '90%',
    height: 40,
    resizeMode: 'contain',
  },
  brandLogoContainer:{
    width: '90%',
    borderWidth: 1,
    borderColor: 'border-basic-color-4',
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  icon:{
    width: 45,
    height: 45,
  },
  iconContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000004f',
    borderRadius: 10
  },
  iconColor:{
    color: 'color-basic-100'
  },
  live:{
    position: 'absolute',
    color: 'white',
    top: 10,
    right: 15,
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    zIndex: 2,
  }
});